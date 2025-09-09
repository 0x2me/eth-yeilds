import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TrendingUp, TrendingDown, Shield, Zap, ExternalLink, Info } from "lucide-react";

interface YieldCardProps {
  protocol: string;
  asset: string;
  apy: number;
  tvl: string;
  risk: 'low' | 'medium' | 'high';
  category: string;
  description: string;
  logo?: string;
  trending?: 'up' | 'down' | 'stable';
  strategy?: string;
  risks?: string[];
}

const YieldCard = ({
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
}: YieldCardProps) => {
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
    <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/20">
      {/* Animated Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow"></div>
      
      <CardHeader className="relative z-10 pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              {protocol}
              {getTrendingIcon()}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Info className="w-4 h-4" />
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
            </CardTitle>
            <p className="text-sm text-muted-foreground">{asset}</p>
          </div>
          <Badge variant="secondary" className="text-xs font-mono">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* APY Display */}
        <div className="text-center py-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
          <div className="text-3xl font-bold text-primary">
            {apy.toFixed(2)}%
          </div>
          <p className="text-sm text-muted-foreground">Annual APY</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">TVL</p>
            <p className="font-semibold text-foreground">{tvl}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Risk Level</p>
            <Badge className={`${getRiskColor(risk)} text-xs flex items-center gap-1 w-fit`}>
              {getRiskIcon(risk)}
              {risk.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Action Button */}
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border-primary/20 hover:border-primary"
        >
          <span>View Details</span>
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default YieldCard;