'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MDXComponentProps {
  children?: ReactNode;
  className?: string;
}

interface CodeBlockProps extends MDXComponentProps {
  highlightedCode?: string;
  language?: string;
}

export function H1({ children, className }: MDXComponentProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl mb-6 mt-8 first:mt-0',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: MDXComponentProps) {
  const id =
    typeof children === 'string'
      ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      : '';

  return (
    <h2
      id={id}
      className={cn(
        'scroll-m-20 border-b border-border/50 pb-2 text-2xl font-semibold tracking-tight transition-colors mb-4 mt-10 first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: MDXComponentProps) {
  const id =
    typeof children === 'string'
      ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      : '';

  return (
    <h3
      id={id}
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight mb-3 mt-8',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: MDXComponentProps) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-lg font-semibold tracking-tight mb-2 mt-6',
        className
      )}
    >
      {children}
    </h4>
  );
}

export function Paragraph({ children, className }: MDXComponentProps) {
  return (
    <p className={cn('leading-7 text-muted-foreground mb-4 [&:not(:first-child)]:mt-4', className)}>
      {children}
    </p>
  );
}

export function UnorderedList({ children, className }: MDXComponentProps) {
  return (
    <ul className={cn('my-4 ml-6 list-disc text-muted-foreground [&>li]:mt-2', className)}>
      {children}
    </ul>
  );
}

export function OrderedList({ children, className }: MDXComponentProps) {
  return (
    <ol className={cn('my-4 ml-6 list-decimal text-muted-foreground [&>li]:mt-2', className)}>
      {children}
    </ol>
  );
}

export function ListItem({ children, className }: MDXComponentProps) {
  return <li className={cn('leading-7', className)}>{children}</li>;
}

export function Blockquote({ children, className }: MDXComponentProps) {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-4 border-primary/50 pl-6 italic text-muted-foreground',
        className
      )}
    >
      {children}
    </blockquote>
  );
}

export function InlineCode({ children, className }: MDXComponentProps) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-primary',
        className
      )}
    >
      {children}
    </code>
  );
}

export function CodeBlock({ children, highlightedCode, language, className }: CodeBlockProps) {
  return (
    <div className={cn('relative my-6 rounded-lg overflow-hidden', className)}>
      {language && (
        <div className="flex items-center justify-between bg-[#1a1b26] px-4 py-2 border-b border-border/30">
          <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        {highlightedCode ? (
          <div
            className="overflow-x-auto bg-[#1a1b26] p-4 text-sm font-mono [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre className="overflow-x-auto bg-[#1a1b26] p-4 text-sm font-mono">
            <code className="text-foreground">{children}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export function Table({ children, className }: MDXComponentProps) {
  return (
    <div className={cn('my-6 w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function TableHead({ children, className }: MDXComponentProps) {
  return (
    <thead className={cn('bg-muted/50', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: MDXComponentProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className }: MDXComponentProps) {
  return (
    <tr className={cn('border-b border-border/50 transition-colors hover:bg-muted/30', className)}>
      {children}
    </tr>
  );
}

export function TableHeader({ children, className }: MDXComponentProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left font-medium text-foreground [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className }: MDXComponentProps) {
  return (
    <td
      className={cn(
        'px-4 py-3 text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
    >
      {children}
    </td>
  );
}

export function HorizontalRule({ className }: MDXComponentProps) {
  return <hr className={cn('my-8 border-border/50', className)} />;
}

export function Anchor({ children, className, ...props }: MDXComponentProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function Strong({ children, className }: MDXComponentProps) {
  return (
    <strong className={cn('font-semibold text-foreground', className)}>
      {children}
    </strong>
  );
}

export function Emphasis({ children, className }: MDXComponentProps) {
  return <em className={cn('italic', className)}>{children}</em>;
}

// Component mapping for MDX
export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  code: InlineCode,
  pre: CodeBlock,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  hr: HorizontalRule,
  a: Anchor,
  strong: Strong,
  em: Emphasis,
};
