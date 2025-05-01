
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { generateMoodBasedRecommendations, hasApiKey } from '@/lib/gemini-api';
import { Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const moods = [
  { value: "energetic", label: "Energetic & Adventure-seeking" },
  { value: "relaxed", label: "Relaxed & Peaceful" },
  { value: "curious", label: "Curious & Cultural" },
  { value: "romantic", label: "Romantic & Scenic" },
  { value: "social", label: "Social & Vibrant" },
];

const budgets = [
  { value: "budget", label: "Budget-friendly" },
  { value: "moderate", label: "Moderate" },
  { value: "luxury", label: "Luxury" },
];

const durations = [
  { value: "weekend", label: "Weekend Getaway (1-3 days)" },
  { value: "short", label: "Short Trip (4-7 days)" },
  { value: "medium", label: "Medium Trip (1-2 weeks)" },
  { value: "long", label: "Long Trip (2+ weeks)" },
];

type TravelPreferencesType = {
  mood: string;
  budget: string;
  duration: string;
  activities: string[];
  specialRequirements: string;
};

const TravelQuiz = () => {
  const [step, setStep] = useState(1);
  const [travelPreferences, setTravelPreferences] = useState<TravelPreferencesType>({
    mood: '',
    budget: '',
    duration: '',
    activities: [],
    specialRequirements: '',
  });
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleActivityToggle = (activity: string) => {
    setTravelPreferences(prev => {
      const activities = prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity];
      return { ...prev, activities };
    });
  };

  const handleNextStep = () => {
    if (step === 1 && !travelPreferences.mood) {
      setError("Please select your current mood");
      return;
    }
    if (step === 2 && (!travelPreferences.budget || !travelPreferences.duration)) {
      setError("Please complete all fields");
      return;
    }
    
    setError(null);
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!hasApiKey()) {
      setError("Please set your Gemini API key in the chatbot settings first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const preferencesText = `
      Mood: ${moods.find(m => m.value === travelPreferences.mood)?.label || travelPreferences.mood}
      Budget: ${budgets.find(b => b.value === travelPreferences.budget)?.label || travelPreferences.budget}
      Duration: ${durations.find(d => d.value === travelPreferences.duration)?.label || travelPreferences.duration}
      Activities of interest: ${travelPreferences.activities.join(', ')}
      Special requirements: ${travelPreferences.specialRequirements || 'None'}
    `;
    
    try {
      const response = await generateMoodBasedRecommendations(
        moods.find(m => m.value === travelPreferences.mood)?.label || travelPreferences.mood,
        preferencesText
      );
      setRecommendation(response);
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setTravelPreferences({
      mood: '',
      budget: '',
      duration: '',
      activities: [],
      specialRequirements: '',
    });
    setRecommendation('');
    setError(null);
    setStep(1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">How are you feeling today?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {moods.map((mood) => (
                  <div
                    key={mood.value}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      travelPreferences.mood === mood.value
                        ? 'bg-primary text-white shadow-lg scale-[1.02]'
                        : 'bg-accent hover:bg-accent/80'
                    }`}
                    onClick={() => setTravelPreferences({...travelPreferences, mood: mood.value})}
                  >
                    <div className="font-medium">{mood.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-end">
              <Button 
                onClick={handleNextStep}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">What's your budget?</h3>
                <RadioGroup
                  value={travelPreferences.budget}
                  onValueChange={(value) => setTravelPreferences({...travelPreferences, budget: value})}
                  className="grid grid-cols-3 gap-3"
                >
                  {budgets.map((budget) => (
                    <div key={budget.value} className="flex items-center">
                      <RadioGroupItem value={budget.value} id={budget.value} className="peer sr-only" />
                      <Label
                        htmlFor={budget.value}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent cursor-pointer text-center"
                      >
                        {budget.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Trip duration</h3>
                <Select 
                  value={travelPreferences.duration} 
                  onValueChange={(value) => setTravelPreferences({...travelPreferences, duration: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your preferred trip length" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button 
                onClick={handleNextStep}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Activities you're interested in</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Beach', 'Mountains', 'Cities', 'Cultural Sites', 'Food & Dining', 'Adventure', 
                  'Relaxation', 'Shopping', 'Nightlife', 'Nature', 'Wildlife', 'Photography'].map((activity) => (
                  <div
                    key={activity}
                    onClick={() => handleActivityToggle(activity)}
                    className={`p-3 rounded-lg text-sm font-medium cursor-pointer transition-all text-center ${
                      travelPreferences.activities.includes(activity)
                        ? 'bg-primary text-white'
                        : 'bg-accent hover:bg-accent/80'
                    }`}
                  >
                    {activity}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Any special requirements?</h3>
              <Input
                placeholder="e.g., Family-friendly, pet-friendly, accessibility needs..."
                value={travelPreferences.specialRequirements}
                onChange={(e) => setTravelPreferences({...travelPreferences, specialRequirements: e.target.value})}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Get Recommendations</>
                )}
              </Button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-accent p-5 rounded-xl">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                Your Travel Recommendations
              </h3>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Finding perfect destinations for you...</p>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line">
                  {recommendation}
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button 
                onClick={handleReset}
                variant="outline" 
                className="border-primary/20 hover:bg-accent/50"
              >
                Start Over
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-md bg-white border-accent">
      <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6" /> 
          Travel Personality Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div 
                key={stepNumber} 
                className={`flex flex-col items-center ${stepNumber <= step ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                  ${stepNumber < step ? 'bg-primary text-white' : 
                    stepNumber === step ? 'border-2 border-primary text-primary' : 'border-2 border-muted text-muted-foreground'}`}
                >
                  {stepNumber}
                </div>
                <div className="text-xs hidden sm:block">
                  {stepNumber === 1 && "Mood"}
                  {stepNumber === 2 && "Budget"}
                  {stepNumber === 3 && "Interests"}
                  {stepNumber === 4 && "Results"}
                </div>
              </div>
            ))}
            
            <div className="absolute left-0 right-0 top-[6.5rem] flex justify-center z-[-1]">
              <div className="h-0.5 bg-muted w-4/5"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          {renderStep()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelQuiz;
