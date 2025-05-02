
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signInWithGoogle, signOut } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error("Failed to sign in");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully!");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-travel-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">V</span>
            <span className="font-bold text-xl">VIANOVA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-travel-primary font-medium">Home</Link>
            <Link to="/destinations" className="text-foreground hover:text-travel-primary font-medium">Destinations</Link>
            <Link to="/about" className="text-foreground hover:text-travel-primary font-medium">About</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      {user.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.name} />
                      ) : (
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="hover:bg-travel-accent hover:text-travel-primary"
                  onClick={handleSignIn}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  className="bg-travel-primary hover:bg-travel-secondary"
                  onClick={handleSignIn}
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-travel-primary font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/destinations" 
                className="text-foreground hover:text-travel-primary font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-travel-primary font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              {user ? (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-2 py-2">
                    <Avatar className="h-8 w-8">
                      {user.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.name} />
                      ) : (
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link 
                    to="/profile" 
                    className="text-foreground hover:text-travel-primary py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/bookings" 
                    className="text-foreground hover:text-travel-primary py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Button 
                    variant="outline" 
                    className="justify-start mt-2"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Button 
                    variant="ghost" 
                    className="justify-start hover:bg-travel-accent hover:text-travel-primary w-full"
                    onClick={() => {
                      handleSignIn();
                      setIsOpen(false);
                    }}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                  <Button 
                    className="bg-travel-primary hover:bg-travel-secondary w-full"
                    onClick={() => {
                      handleSignIn();
                      setIsOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
