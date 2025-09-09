import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist in our DeFi yield platform.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>
              Back to Home
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="outline">
              View Portfolio
            </Button>
          </Link>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Lost in the DeFi space? Our Yield Bots can help guide you back.</p>
        </div>
      </div>
    </div>
  );
}