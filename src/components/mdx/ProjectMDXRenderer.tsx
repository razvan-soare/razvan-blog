'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import {
  StyledQuote,
  VideoEmbed,
  MDXImage,
  ImageGallery,
  Callout,
  LinkCard,
} from './ProjectMDXComponents';

// ============================================
// Types
// ============================================

interface ProjectMDXRendererProps {
  html: string;
  className?: string;
}

interface PortalTarget {
  id: string;
  type: string;
  props: Record<string, unknown>;
  container: HTMLElement;
}

// ============================================
// Code Block Copy Button Setup
// ============================================

function setupCodeBlockCopyButtons(container: HTMLElement) {
  const copyButtons = container.querySelectorAll('.code-block-copy');

  copyButtons.forEach((button) => {
    const codeBlock = button.closest('.project-codeblock');
    if (!codeBlock) return;

    const encodedCode = codeBlock.getAttribute('data-code');
    if (!encodedCode) return;

    const code = decodeURIComponent(encodedCode);

    // Remove existing listeners by cloning the button
    const newButton = button.cloneNode(true) as HTMLElement;
    button.parentNode?.replaceChild(newButton, button);

    newButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code);

        const originalText = newButton.textContent;
        newButton.textContent = 'Copied!';
        newButton.classList.add('copied');

        setTimeout(() => {
          newButton.textContent = originalText;
          newButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

// ============================================
// Simple MDX Renderer
// ============================================

export function SimpleMDXRenderer({ html, className }: ProjectMDXRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setupCodeBlockCopyButtons(containerRef.current);
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={cn('mdx-content project-mdx-content', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ============================================
// Main MDX Renderer
// ============================================

export function ProjectMDXRenderer({ html, className }: ProjectMDXRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setupCodeBlockCopyButtons(containerRef.current);
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={cn('mdx-content project-mdx-content', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ============================================
// MDX Renderer with React Component Support
// ============================================

export function ProjectMDXWithComponents({ html, className }: ProjectMDXRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [portalTargets, setPortalTargets] = useState<PortalTarget[]>([]);
  const processedRef = useRef(false);

  // Render component based on type
  const renderComponent = useCallback((type: string, props: Record<string, unknown>) => {
    const children = props.children as string | undefined;

    switch (type) {
      case 'quote':
        return (
          <StyledQuote
            author={props.author as string}
            source={props.source as string}
          >
            {children}
          </StyledQuote>
        );

      case 'video':
        return (
          <VideoEmbed
            url={props.url as string}
            title={props.title as string}
          />
        );

      case 'image':
        return (
          <MDXImage
            src={props.src as string}
            alt={props.alt as string}
            caption={props.caption as string}
          />
        );

      case 'gallery': {
        const imagesStr = props.images as string;
        let images: Array<{ src: string; alt: string; caption?: string }> = [];

        try {
          if (imagesStr) {
            images = JSON.parse(imagesStr);
          }
        } catch {
          if (imagesStr) {
            images = imagesStr.split(',').map((src, i) => ({
              src: src.trim(),
              alt: `Gallery image ${i + 1}`,
            }));
          }
        }

        return <ImageGallery images={images} />;
      }

      case 'callout':
        return (
          <Callout
            type={props.type as 'info' | 'warning' | 'error' | 'success' | 'tip'}
            title={props.title as string}
          >
            {children}
          </Callout>
        );

      case 'linkcard':
        return (
          <LinkCard
            href={props.href as string}
            title={props.title as string}
            description={props.description as string}
          />
        );

      default:
        return null;
    }
  }, []);

  // Setup portals after DOM is ready using a callback ref pattern
  const handleContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || processedRef.current) return;
    processedRef.current = true;

    // Setup copy buttons
    setupCodeBlockCopyButtons(node);

    // Find and process component placeholders
    const componentElements = node.querySelectorAll('.project-component');
    const targets: PortalTarget[] = [];

    componentElements.forEach((el, index) => {
      const componentType = el.getAttribute('data-component');
      const propsData = el.getAttribute('data-props');

      if (componentType && propsData) {
        try {
          const props = JSON.parse(decodeURIComponent(propsData));

          // Create container for the portal
          const container = document.createElement('div');
          container.className = 'project-component-rendered';
          container.setAttribute('data-portal-id', `portal-${index}`);

          // Replace placeholder with container
          el.parentNode?.replaceChild(container, el);

          targets.push({
            id: `portal-${index}`,
            type: componentType,
            props,
            container,
          });
        } catch (error) {
          console.error('Failed to parse component props:', error);
        }
      }
    });

    // Update state with targets - this will trigger re-render to create portals
    if (targets.length > 0) {
      // Use setTimeout to avoid setState during render
      setTimeout(() => setPortalTargets(targets), 0);
    }
  }, []);

  // Store ref for effect cleanup
  useEffect(() => {
    const node = containerRef.current;
    if (node) {
      handleContainerRef(node);
    }
  }, [html, handleContainerRef]);

  return (
    <div className={cn('mdx-content project-mdx-content', className)}>
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {portalTargets.map((target) => (
        createPortal(
          <div key={target.id}>
            {renderComponent(target.type, target.props)}
          </div>,
          target.container
        )
      ))}
    </div>
  );
}
