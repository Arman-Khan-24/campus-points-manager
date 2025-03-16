
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Credentials for testing
const VALID_ERP = "S12345";
const VALID_PASSWORD = "campus123";

const Index = () => {
  const [erpId, setErpId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let captchaText = "";
    for (let i = 0; i < 6; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captchaText);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!erpId || !password || !userCaptcha) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (userCaptcha !== captcha) {
      toast({
        title: "Captcha Error",
        description: "Incorrect captcha. Please try again.",
        variant: "destructive",
      });
      generateCaptcha();
      setUserCaptcha("");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (erpId === VALID_ERP && password === VALID_PASSWORD) {
        // Store login state
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userErp", erpId);
        
        toast({
          title: "Success",
          description: "Login successful! Redirecting to dashboard...",
        });
        
        navigate("/dashboard");
      } else {
        toast({
          title: "Authentication Error",
          description: "Invalid ERP ID or password",
          variant: "destructive",
        });
        generateCaptcha();
        setUserCaptcha("");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <Card className="border-2">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-white">CP</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Campus Points</CardTitle>
            <CardDescription>
              Enter your ERP ID and password to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="erp-id">ERP ID</Label>
                  <Input
                    id="erp-id"
                    placeholder="Enter your ERP ID"
                    value={erpId}
                    onChange={(e) => setErpId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="captcha">Captcha Verification</Label>
                  <div className="flex items-center space-x-2">
                    <div className="captcha-container" onClick={generateCaptcha}>
                      {captcha}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={generateCaptcha}
                    >
                      ↻
                    </Button>
                  </div>
                  <Input
                    id="captcha"
                    placeholder="Enter captcha text"
                    className="mt-2"
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-muted-foreground">
              <span>Demo credentials:</span>
              <div className="text-xs bg-muted p-2 rounded-md mt-1 text-left">
                <p><strong>ERP ID:</strong> {VALID_ERP}</p>
                <p><strong>Password:</strong> {VALID_PASSWORD}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
