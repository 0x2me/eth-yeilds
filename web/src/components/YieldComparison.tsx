"use client";

import { useState } from "react";
import YieldCard from "./YieldCard";
import YieldRow from "./YieldRow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp, Zap, RefreshCw } from "lucide-react";

interface Protocol {
  protocol: string;
  asset: string;
  apy: number;
  tvl: string;
  risk: 'low' | 'medium' | 'high';
  category: string;
  description: string;
  trending?: 'up' | 'down' | 'stable';
  strategy?: string;
  risks?: string[];
}

const mockProtocols: Protocol[] = [
  {
    protocol: "Lido",
    asset: "stETH",
    apy: 3.2,
    tvl: "$34.5B",
    risk: "low",
    category: "Liquid Staking",
    description: "Ethereum liquid staking with automatic rewards and DeFi composability.",
    trending: "up",
    strategy: "Lido stakes your ETH across a distributed set of validators, automatically handling the technical aspects of staking while providing you with stETH tokens that can be used in DeFi protocols for additional yield.",
    risks: [
      "Validator slashing risk (mitigated by diversification)",
      "Smart contract risk in Lido protocol",
      "Ethereum network consensus risks",
      "Potential regulatory changes affecting staking"
    ]
  },
  {
    protocol: "Rocket Pool",
    asset: "rETH",
    apy: 3.1,
    tvl: "$2.8B",
    risk: "low",
    category: "Liquid Staking",
    description: "Decentralized Ethereum staking with no minimum requirement.",
    trending: "up",
    strategy: "Rocket Pool operates as a decentralized network of node operators who stake ETH on your behalf. You receive rETH tokens that appreciate in value as staking rewards accumulate, providing both staking yield and DeFi composability.",
    risks: [
      "Node operator performance variability",
      "Smart contract bugs in protocol",
      "Lower liquidity compared to centralized alternatives",
      "Ethereum network slashing conditions"
    ]
  },
  {
    protocol: "Frax Ether",
    asset: "frxETH",
    apy: 3.5,
    tvl: "$1.2B",
    risk: "medium",
    category: "Liquid Staking",
    description: "Dual-token liquid staking system with competitive yields.",
    trending: "stable",
    strategy: "Frax Ether uses a dual-token model where frxETH is the liquid staking token and sfrxETH accumulates staking rewards. Users can choose between holding non-yielding frxETH for DeFi or staking it as sfrxETH for maximum yield.",
    risks: [
      "Complexity of dual-token mechanism",
      "Newer protocol with less battle-testing",
      "Dependency on Frax ecosystem stability",
      "Potential yield volatility based on staking participation"
    ]
  },
  {
    protocol: "Aave V3",
    asset: "ETH",
    apy: 2.8,
    tvl: "$8.9B",
    risk: "low",
    category: "Lending",
    description: "Supply ETH and earn yield while maintaining liquidity.",
    trending: "stable",
    strategy: "Aave V3 allows you to supply ETH to earn interest from borrowers while maintaining the ability to withdraw anytime. Features include efficiency mode, isolation mode, and risk management tools for enhanced capital efficiency.",
    risks: [
      "Liquidation risk if using as collateral",
      "Interest rate volatility based on utilization",
      "Smart contract risk in Aave protocol",
      "Potential bank run scenarios in extreme market stress"
    ]
  },
  {
    protocol: "Compound V3",
    asset: "ETH",
    apy: 2.4,
    tvl: "$3.1B",
    risk: "low",
    category: "Lending",
    description: "Lend ETH in autonomous money market protocol.",
    trending: "down",
    strategy: "Compound V3 features a simplified single-asset base design where ETH serves as both collateral and the base borrowing asset. This creates more efficient markets with reduced gas costs and improved user experience.",
    risks: [
      "Interest rate model changes affecting returns",
      "Governance risk from protocol changes",
      "Liquidation cascades in market downturns",
      "Competition reducing yields over time"
    ]
  },
  {
    protocol: "Uniswap V3",
    asset: "ETH/USDC",
    apy: 12.5,
    tvl: "$2.4B",
    risk: "high",
    category: "LP Farming",
    description: "Provide ETH/USDC liquidity with concentrated positions.",
    trending: "up",
    strategy: "Uniswap V3 allows concentrated liquidity provision where you can specify price ranges for maximum capital efficiency. Higher fees and rewards come from providing liquidity in active price ranges, but requires active management.",
    risks: [
      "Impermanent loss from ETH price movements",
      "Price range management complexity",
      "High gas costs for position adjustments",
      "MEV attacks and sandwich trading exposure"
    ]
  },
  {
    protocol: "Curve ETH",
    asset: "stETH/ETH",
    apy: 4.8,
    tvl: "$1.8B",
    risk: "medium",
    category: "LP Farming",
    description: "ETH liquid staking pool with low impermanent loss.",
    trending: "up",
    strategy: "Curve's stETH/ETH pool is designed for highly correlated assets, minimizing impermanent loss while earning trading fees and CRV rewards. The stable swap algorithm provides efficient trading between ETH and its staked versions.",
    risks: [
      "stETH depeg risk during market stress",
      "CRV token price volatility affecting rewards",
      "Pool imbalance leading to reduced efficiency",
      "Smart contract risks in Curve protocol"
    ]
  },
  {
    protocol: "Yearn ETH",
    asset: "yvETH",
    apy: 5.2,
    tvl: "$890M",
    risk: "medium",
    category: "Yield Farming",
    description: "Automated ETH yield strategies with gas optimization.",
    trending: "up",
    strategy: "Yearn vaults automatically deploy ETH across various DeFi strategies, rebalancing and compounding rewards to maximize yield while socializing gas costs across all vault participants for optimal efficiency.",
    risks: [
      "Strategy risk from multiple protocol exposure",
      "Vault management and strategy changes",
      "Withdrawal delays during strategy migrations",
      "Dependency on vault strategist performance"
    ]
  },
  {
    protocol: "Pendle",
    asset: "PT-stETH",
    apy: 6.8,
    tvl: "$450M",
    risk: "high",
    category: "Yield Trading",
    description: "Fixed yield on ETH staking through tokenized yields.",
    trending: "up",
    strategy: "Pendle splits yield-bearing assets into Principal Tokens (PT) and Yield Tokens (YT), allowing users to trade future yields or lock in fixed rates. Complex but powerful for yield optimization and hedging strategies.",
    risks: [
      "Complex tokenomics requiring deep understanding",
      "Market risk from yield token price volatility",
      "Lower liquidity in secondary markets",
      "Time decay risk on yield tokens approaching maturity"
    ]
  },
  {
    protocol: "Ethereum 2.0",
    asset: "ETH",
    apy: 3.0,
    tvl: "$115B",
    risk: "low",
    category: "Native Staking",
    description: "Direct Ethereum network staking with 32 ETH minimum.",
    trending: "stable",
    strategy: "Direct validation on Ethereum requires running validator nodes with 32 ETH stakes. Validators earn rewards for proposing and attesting blocks but must maintain high uptime and follow protocol rules to avoid penalties.",
    risks: [
      "32 ETH minimum requirement barrier",
      "Technical complexity of running validators",
      "Slashing risk from validator misbehavior",
      "Long withdrawal queues during high exit demand"
    ]
  }
];

const YieldComparison = () => {
  const [protocols] = useState<Protocol[]>(mockProtocols);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("apy");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredProtocols = protocols
    .filter(protocol => {
      const matchesSearch = protocol.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           protocol.asset.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = filterRisk === "all" || protocol.risk === filterRisk;
      const matchesCategory = filterCategory === "all" || protocol.category === filterCategory;
      
      return matchesSearch && matchesRisk && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "apy":
          return b.apy - a.apy;
        case "tvl":
          return parseFloat(b.tvl.replace(/[$BM]/g, "")) - parseFloat(a.tvl.replace(/[$BM]/g, ""));
        case "protocol":
          return a.protocol.localeCompare(b.protocol);
        default:
          return 0;
      }
    });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const categories = [...new Set(protocols.map(p => p.category))];
  const totalTVL = protocols.reduce((sum, p) => sum + parseFloat(p.tvl.replace(/[$BM]/g, "")), 0);
  const avgAPY = protocols.reduce((sum, p) => sum + p.apy, 0) / protocols.length;

  return (
    <div className="w-full space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-card to-card/80 p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Total Protocols
          </div>
          <div className="text-2xl font-bold text-foreground">{protocols.length}</div>
        </div>
        
        <div className="bg-gradient-to-r from-card to-card/80 p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Zap className="w-4 h-4" />
            Avg APY
          </div>
          <div className="text-2xl font-bold text-primary">{avgAPY.toFixed(2)}%</div>
        </div>

        <div className="bg-gradient-to-r from-card to-card/80 p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Total TVL
          </div>
          <div className="text-2xl font-bold text-foreground">${totalTVL.toFixed(1)}B</div>
        </div>

        <div className="bg-gradient-to-r from-card to-card/80 p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Last Updated
          </div>
          <div className="text-sm text-muted-foreground">2 min ago</div>
          <Button 
            onClick={handleRefresh}
            variant="ghost" 
            size="sm" 
            className="mt-1 h-6 text-xs"
            disabled={isRefreshing}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/50 p-4 rounded-lg border border-border/50">
        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search protocols or assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-border/50 focus:border-primary/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="w-[120px] border-border/50">
              <SelectValue placeholder="Risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[140px] border-border/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px] border-border/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apy">APY</SelectItem>
              <SelectItem value="tvl">TVL</SelectItem>
              <SelectItem value="protocol">Protocol</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/20">
            {filteredProtocols.length} protocols found
          </Badge>
        </div>
      </div>

      {/* Protocol Display - Rows on Desktop, Cards on Mobile */}
      <div className="space-y-4">
        {/* Desktop Rows - Hidden on Mobile */}
        <div className="hidden md:block space-y-3">
          {filteredProtocols.map((protocol, index) => (
            <YieldRow
              key={`${protocol.protocol}-${protocol.asset}-${index}`}
              {...protocol}
              strategy={protocol.strategy}
              risks={protocol.risks}
            />
          ))}
        </div>

        {/* Mobile Cards - Hidden on Desktop */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {filteredProtocols.map((protocol, index) => (
            <YieldCard
              key={`${protocol.protocol}-${protocol.asset}-${index}`}
              {...protocol}
              strategy={protocol.strategy}
              risks={protocol.risks}
            />
          ))}
        </div>
      </div>

      {filteredProtocols.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-2">No protocols found</div>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default YieldComparison;