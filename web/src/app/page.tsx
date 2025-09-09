// import MatrixChat from "@/components/MatrixChat";
import YieldComparison from "@/components/YieldComparison";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  E
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  ETH Yields
                </h1>
                <p className="text-xs text-muted-foreground">
                  Ethereum Yield Platform
                </p>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <Button variant="outline">Home</Button>
              <Link href="/portfolio">
                <Button variant="ghost">Portfolio</Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Live Market Data</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Matrix Chat Interface */}
        <section className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Yield Bots</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized DeFi strategies, yield optimization, and
              real-time opportunities from our advanced Yield Bots.
            </p>
          </div>

          {/* Matrix Chat Interface - Coming Soon */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Matrix Header */}
            <div className="bg-matrix-bg border border-matrix-green-dim rounded-t-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-matrix-green animate-pulse">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h2 className="font-mono text-matrix-green text-lg font-bold">
                  Yield Bots
                </h2>
                <div className="flex gap-2 ml-auto">
                  <div className="w-3 h-3 rounded-full bg-matrix-green-dim animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-matrix-green-dim"></div>
                  <div className="w-3 h-3 rounded-full bg-matrix-green-dim"></div>
                </div>
              </div>
            </div>

            {/* Coming Soon Message */}
            <div className="bg-matrix-bg/95 border-l border-r border-b border-matrix-green-dim rounded-b-lg p-8 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="text-matrix-green font-mono text-2xl font-bold animate-cyber-flicker">
                  COMING SOON
                </div>
                <div className="text-matrix-green-dim font-mono text-sm max-w-md mx-auto">
                  Advanced AI yield optimization bots are being trained on DeFi
                  protocols. Get ready for personalized strategies and real-time
                  opportunities.
                </div>
                <div className="flex justify-center items-center gap-2 mt-6">
                  <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Yield Comparison Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Top ETH Protocols
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare ETH yields across leading protocols. Real-time APY data,
              risk analysis, and TVL metrics for ETH staking and farming.
            </p>
          </div>

          <YieldComparison />
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2024 ETH Yields. Data for educational purposes only.</p>
            <div className="flex items-center gap-4">
              <span>Powered by Ethereum</span>
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
