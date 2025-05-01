
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { generateMoodBasedRecommendations, hasApiKey } from '@/lib/gemini-api';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MoodRecommender = () => {
  const [mood, setMood] = useState('');
  const [preferences, setPreferences] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasApiKey()) {
      setError("Please set your Gemini API key in the chatbot settings first.");
      return;
    }
    
    if (!mood.trim()) {
      setError("Please describe your current mood.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setIsFormSubmitted(true);
    
    try {
      const response = await generateMoodBasedRecommendations(mood, preferences);
      setRecommendation(response);
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setMood('');
    setPreferences('');
    setRecommendation('');
    setError(null);
    setIsFormSubmitted(false);
  };

  return (
    <Card className="w-full shadow-md bg-white border-travel-accent">
      <CardHeader className="bg-gradient-to-r from-travel-primary to-travel-secondary text-white">
        <CardTitle className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" /> 
          Mood-Based Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {!isFormSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="mood" className="text-sm font-medium text-gray-700">
                How are you feeling today?
              </label>
              <Input
                id="mood"
                placeholder="e.g., Stressed and need relaxation, Adventurous and energetic..."
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="border-travel-primary/20 focus-visible:ring-travel-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="preferences" className="text-sm font-medium text-gray-700">
                Any specific travel preferences? (optional)
              </label>
              <Textarea
                id="preferences"
                placeholder="e.g., Beach destinations, historical sites, budget-friendly options..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="resize-none h-24 border-travel-primary/20 focus-visible:ring-travel-primary"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-travel-primary hover:bg-travel-secondary transition-colors"
              disabled={!mood.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating recommendations...
                </>
              ) : (
                <>Find My Perfect Destination</>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-travel-primary" />
                <p className="mt-4 text-muted-foreground">Finding destinations that match your mood...</p>
              </div>
            ) : (
              <>
                <div className="bg-travel-light p-4 rounded-lg">
                  <h3 className="font-medium text-travel-secondary mb-2">Your Mood</h3>
                  <p className="text-gray-700">{mood}</p>
                  {preferences && (
                    <>
                      <h3 className="font-medium text-travel-secondary mt-4 mb-2">Your Preferences</h3>
                      <p className="text-gray-700">{preferences}</p>
                    </>
                  )}
                </div>
                
                <div className="border-l-4 border-travel-primary pl-4 py-1">
                  <h3 className="font-medium text-travel-secondary mb-2">AI Recommendations</h3>
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                    {recommendation}
                  </div>
                </div>
                
                <Button 
                  onClick={handleReset}
                  variant="outline" 
                  className="w-full border-travel-primary/20 hover:bg-travel-accent/50"
                >
                  Try Another Mood
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodRecommender;
