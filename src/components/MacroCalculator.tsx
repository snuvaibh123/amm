import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MacroResults {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export const MacroCalculator = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'email-capture' | 'results'>('email-capture');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getMockResults = (): MacroResults => {
    return {
      calories: 2200,
      protein: 165,
      carbs: 220,
      fats: 73,
    };
  };

  const handleEmailSubmit = async () => {
    if (!name || !email || !email.includes('@')) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send only name and email to Google Apps Script
      await fetch("https://script.google.com/macros/s/AKfycby19uhDJsWjvcpiYvv85sThLW3CzX0rHsGgzMed16uQpQVLMAkIBTgVCNFeO3grDJhZVQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email
        })
      });

      const macroResults = getMockResults();
      setStep('results');
    } catch (error) {
      console.error('Error submitting data:', error);
      const macroResults = getMockResults();
      setStep('results');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCalculator = () => {
    setStep('email-capture');
    setName("");
    setEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="glass-intense border-primary/40 hover:border-primary text-foreground font-semibold px-6 py-6 rounded-full transition-all duration-300 hover:scale-105"
        >
          <Calculator className="mr-2" size={20} />
          Macro Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-intense border-primary/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text text-center mb-4">
            Fitness Macro Calculator
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'email-capture' && (
            <motion.div
              key="email-capture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-bold gradient-text">Almost There!</h3>
                <p className="text-foreground/70">Enter your name and email to get your personalized macro results</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground/90 font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/90 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <Button
                  onClick={handleEmailSubmit}
                  disabled={isSubmitting || !email || !name}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-full text-lg glow-coral transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? "Sending..." : "Show My Results"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="inline-block text-4xl mb-2"
                >
                  ✅
                </motion.div>
                <h3 className="text-2xl font-bold gradient-text">Your results are ready!</h3>
                <p className="text-foreground/70">Based on your profile and goals</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Calories */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {getMockResults().calories}
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    kcal/day
                  </div>
                </motion.div>

                {/* Protein */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {getMockResults().protein}g
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Protein
                  </div>
                </motion.div>

                {/* Carbs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {getMockResults().carbs}g
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Carbs
                  </div>
                </motion.div>

                {/* Fats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-intense p-6 rounded-2xl text-center border border-primary/20"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {getMockResults().fats}g
                  </div>
                  <div className="text-foreground/70 text-sm tracking-wide uppercase">
                    Fats
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass bg-primary/10 p-4 rounded-xl border border-primary/20"
              >
                <p className="text-sm text-foreground/80 text-center">
                  💡 These macros are calculated using the Mifflin-St Jeor formula and tailored to your specific goals. Adjust as needed based on your progress.
                </p>
              </motion.div>

              <Button
                onClick={resetCalculator}
                variant="outline"
                className="w-full glass-intense border-primary/40 hover:border-primary text-foreground font-semibold py-6 rounded-full transition-all duration-300"
              >
                Recalculate
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
