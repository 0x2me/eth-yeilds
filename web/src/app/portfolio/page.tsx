import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import Link from "next/link";

interface Position {
  protocol: string;
  asset: string;
  amount: number;
  currentValue: number;
  entryPrice: number;
  currentPrice: number;
  apy: number;
  pnl: number;
  pnlPercent: number;
  status: 'earning' | 'staked' | 'lending';
}

const mockPositions: Position[] = [
  {
    protocol: "Aave",
    asset: "USDC",
    amount: 10000,
    currentValue: 10250.75,
    entryPrice: 1.00,
    currentPrice: 1.025,
    apy: 4.2,
    pnl: 250.75,
    pnlPercent: 2.51,
    status: 'lending'
  },
  {
    protocol: "Compound",
    asset: "ETH",
    amount: 5.5,
    currentValue: 18425.50,
    entryPrice: 3200,
    currentPrice: 3350,
    apy: 3.8,
    pnl: 825.00,
    pnlPercent: 4.69,
    status: 'lending'
  },
  {
    protocol: "Lido",
    asset: "stETH",
    amount: 8.2,
    currentValue: 27470.00,
    entryPrice: 3200,
    currentPrice: 3350,
    apy: 5.1,
    pnl: 1230.00,
    pnlPercent: 4.69,
    status: 'staked'
  },
  {
    protocol: "Uniswap V3",
    asset: "ETH/USDC",
    amount: 2.8,
    currentValue: 9380.00,
    entryPrice: 3200,
    currentPrice: 3350,
    apy: 8.7,
    pnl: 420.00,
    pnlPercent: 4.69,
    status: 'earning'
  }
];

export default function Portfolio() {
  const totalValue = mockPositions.reduce((sum, position) => sum + position.currentValue, 0);
  const totalPnl = mockPositions.reduce((sum, position) => sum + position.pnl, 0);
  const totalPnlPercent = (totalPnl / (totalValue - totalPnl)) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'earning': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'staked': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'lending': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ETH Yields
            </span>
          </Link>
          <nav className="ml-auto flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Button variant="outline">Portfolio</Button>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Live Data</span>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              {totalPnl >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
              </div>
              <p className={`text-xs ${totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalPnl >= 0 ? '+' : ''}{totalPnlPercent.toFixed(2)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPositions.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {new Set(mockPositions.map(p => p.protocol)).size} protocols
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Positions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Positions</CardTitle>
            <CardDescription>
              Track your current DeFi investments and yields
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPositions.map((position, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-semibold">{position.protocol}</div>
                      <div className="text-sm text-muted-foreground">{position.asset}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Amount</div>
                    <div className="font-medium">{position.amount.toLocaleString()}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Current Value</div>
                    <div className="font-medium">${position.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">APY</div>
                    <div className="font-medium text-green-500">{position.apy}%</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">P&L</div>
                    <div className={`font-medium ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </div>
                    <div className={`text-sm ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {position.pnl >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(position.status)}>
                      {position.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mt-16">
          <p>&copy; 2024 ETH Yields Platform. Real-time DeFi yield tracking.</p>
        </footer>
      </div>
    </div>
  );
}