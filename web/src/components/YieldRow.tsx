import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TrendingUp, TrendingDown, Shield, Zap, ExternalLink, Info } from "lucide-react";

interface YieldRowProps {
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

const YieldRow = ({
  protocol,
  asset,
  apy,
  tvl,
  risk,
  category,
  description,
  trending = 'stable',
  strategy = "Strategy information not available",
  risks = ["Risk information not available"]
}: YieldRowProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <Shield className="w-3 h-3" />;
      case 'medium': return <Zap className="w-3 h-3" />;
      case 'high': return <TrendingUp className="w-3 h-3" />;
      default: return null;
    }
  };

  const getTrendingIcon = () => {
    switch (trending) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="group bg-gradient-to-r from-card to-card/80 border border-border/50 hover:border-primary/50 transition-all duration-300 rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Protocol & Asset */}
        <div className="col-span-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{protocol}</h3>
            {getTrendingIcon()}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                >
                  <Info className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Strategy</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {strategy}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Risk Factors</h4>
                    <ul className="space-y-1">
                      {risks.map((riskItem, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-destructive mt-0.5">•</span>
                          {riskItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-1 border-t border-border">
                    <Badge className={`${getRiskColor(risk)} text-xs flex items-center gap-1 w-fit`}>
                      {getRiskIcon(risk)}
                      {risk.toUpperCase()} RISK
                    </Badge>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm text-muted-foreground">{asset}</p>
        </div>

        {/* APY */}
        <div className="col-span-2 text-center">
          <div className="text-xl font-bold text-primary">
            {apy.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">APY</p>
        </div>

        {/* TVL */}
        <div className="col-span-2 text-center">
          <div className="text-lg font-semibold text-foreground">{tvl}</div>
          <p className="text-xs text-muted-foreground">TVL</p>
        </div>

        {/* Risk & Category */}
        <div className="col-span-2">
          <Badge className={`${getRiskColor(risk)} text-xs flex items-center gap-1 w-fit mb-1`}>
            {getRiskIcon(risk)}
            {risk.toUpperCase()}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Action */}
        <div className="col-span-1 text-right">
          <Button 
            variant="outline" 
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YieldRow;