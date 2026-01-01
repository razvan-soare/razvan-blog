import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">Razvan Soare</h1>
        <p className="text-muted-foreground mt-2">Portfolio Coming Soon</p>

        {/* Component Demo Section */}
        <section className="mt-12 space-y-8">
          <h2 className="text-2xl font-semibold">UI Components Demo</h2>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Badges</h3>
            <div className="flex flex-wrap gap-4">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Input</h3>
            <div className="max-w-sm">
              <Input placeholder="Enter your email..." type="email" />
            </div>
          </div>

          {/* Card */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Card</h3>
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Project Title</CardTitle>
                <CardDescription>
                  A brief description of the project goes here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content area of the card component.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Learn More</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Dialog */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Dialog</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog component for modals and confirmations.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Dialog content goes here.</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sheet */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sheet</h3>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet Title</SheetTitle>
                  <SheetDescription>
                    This is a sheet component for side panels.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p>Sheet content goes here.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </section>
      </div>
    </main>
  );
}
