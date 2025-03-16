
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, ArrowUpCircle, ArrowDownCircle, Coffee, Book, Pizza, Utensils } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
}

const CampusPoints = () => {
  const [loaded, setLoaded] = useState(false);
  const [balance, setBalance] = useState(750);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx1",
      date: "2023-08-15",
      description: "Added funds via online payment",
      amount: 500,
      type: "credit",
    },
    {
      id: "tx2",
      date: "2023-08-14",
      description: "Canteen - Lunch",
      amount: 120,
      type: "debit",
    },
    {
      id: "tx3",
      date: "2023-08-12",
      description: "Coffee Shop",
      amount: 80,
      type: "debit",
    },
    {
      id: "tx4",
      date: "2023-08-10",
      description: "Campus Store - Books",
      amount: 350,
      type: "debit",
    },
    {
      id: "tx5",
      date: "2023-08-05",
      description: "Added funds via online payment",
      amount: 800,
      type: "credit",
    },
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    } else {
      setLoaded(true);
    }
  }, [navigate]);

  const handleRecharge = () => {
    const amount = parseInt(rechargeAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to recharge",
        variant: "destructive",
      });
      return;
    }
    
    // Update balance
    setBalance(prev => prev + amount);
    
    // Add transaction record
    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: "Added funds via online payment",
      amount: amount,
      type: "credit",
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Recharge Successful",
      description: `Added ${amount} points to your account`,
    });
    
    setRechargeAmount("");
  };

  const makePayment = (vendor: string, amount: number) => {
    if (balance < amount) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough points for this purchase",
        variant: "destructive",
      });
      return;
    }
    
    // Update balance
    setBalance(prev => prev - amount);
    
    // Add transaction record
    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: `Canteen - ${vendor}`,
      amount: amount,
      type: "debit",
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Payment Successful",
      description: `Paid ${amount} points to ${vendor}`,
    });
  };

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Campus Points</h1>
          <p className="text-muted-foreground">Manage your campus payment system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Balance</CardTitle>
              <CardDescription>Available campus points for purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 mr-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Available Points</p>
                    <h2 className="text-4xl font-bold">{balance}</h2>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Button onClick={() => document.getElementById("recharge-section")?.scrollIntoView({ behavior: "smooth" })}>
                    Recharge Points
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="recharge-section">
            <CardHeader>
              <CardTitle>Recharge Points</CardTitle>
              <CardDescription>Add more points to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRecharge} className="w-full">
                Recharge Now
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Pay</CardTitle>
            <CardDescription>Make quick payments at campus vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Coffee className="h-10 w-10 mx-auto mb-2 text-brand-purple" />
                  <h3 className="font-medium mb-1">Coffee Shop</h3>
                  <Button variant="outline" onClick={() => makePayment("Coffee Shop", 50)} className="w-full mt-2">
                    Pay 50 Points
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Pizza className="h-10 w-10 mx-auto mb-2 text-brand-red" />
                  <h3 className="font-medium mb-1">Pizza Corner</h3>
                  <Button variant="outline" onClick={() => makePayment("Pizza Corner", 150)} className="w-full mt-2">
                    Pay 150 Points
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Utensils className="h-10 w-10 mx-auto mb-2 text-brand-green" />
                  <h3 className="font-medium mb-1">Main Canteen</h3>
                  <Button variant="outline" onClick={() => makePayment("Main Canteen", 120)} className="w-full mt-2">
                    Pay 120 Points
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Book className="h-10 w-10 mx-auto mb-2 text-brand-blue" />
                  <h3 className="font-medium mb-1">Book Store</h3>
                  <Button variant="outline" onClick={() => makePayment("Book Store", 200)} className="w-full mt-2">
                    Pay 200 Points
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="credits">Credits</TabsTrigger>
                <TabsTrigger value="debits">Debits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border">
                      {tx.type === "credit" ? (
                        <ArrowUpCircle className="h-5 w-5 text-green-500 mr-3" />
                      ) : (
                        <ArrowDownCircle className="h-5 w-5 text-red-500 mr-3" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                      <p className={`font-medium ${tx.type === "credit" ? "text-green-500" : "text-red-500"}`}>
                        {tx.type === "credit" ? "+" : "-"}{tx.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="credits">
                <div className="space-y-4">
                  {transactions
                    .filter((tx) => tx.type === "credit")
                    .map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <ArrowUpCircle className="h-5 w-5 text-green-500 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium">{tx.description}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                        <p className="font-medium text-green-500">+{tx.amount}</p>
                      </div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="debits">
                <div className="space-y-4">
                  {transactions
                    .filter((tx) => tx.type === "debit")
                    .map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <ArrowDownCircle className="h-5 w-5 text-red-500 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium">{tx.description}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                        <p className="font-medium text-red-500">-{tx.amount}</p>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CampusPoints;
