import BusinessLoans from '@/components/BusinessLoan';
import BusinessPlanning from '@/components/BusinessPlanning';
import CompanyForation from '@/components/CompanyForation';
import HomeLoans from '@/components/HomeLoans';
import ITRFiling from '@/components/ITRFiling';
import PersonalLoans from '@/components/PersonalLoans';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound'; // ✅ Added missing import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/itr-filing" element={<ITRFiling />} />
          <Route path="/home-loans" element={<HomeLoans />} />
          <Route path="/personal-loans" element={<PersonalLoans />} />
          <Route path="/company-foration" element={<CompanyForation />} />
          <Route path="/business-loans" element={<BusinessLoans />} />
          <Route path="/business-planning" element={<BusinessPlanning />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
