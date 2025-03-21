
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate is the information Chatsector provides?",
      answer: "Chatsector sources information from reputable industry reports, academic research, and up-to-date market data. While we strive for accuracy, we recommend using Chatsector's insights as a starting point for your research and validating critical information through multiple sources."
    },
    {
      question: "Can Chatsector analyze my specific company's performance?",
      answer: "Currently, Chatsector focuses on industry-wide insights rather than individual company analysis. However, you can use the insights to benchmark your company against industry standards and best practices."
    },
    {
      question: "How often is the data updated?",
      answer: "Chatsector's knowledge base is regularly updated to include the latest industry trends, market shifts, and emerging technologies. Our system incorporates new information as it becomes available from trusted sources."
    },
    {
      question: "Can I download or share the insights I receive?",
      answer: "Yes! Chatsector allows you to generate reports from your conversations that can be downloaded as PDFs or shared directly with colleagues via email or other communication platforms."
    },
    {
      question: "Which industries does Chatsector cover?",
      answer: "Chatsector covers a wide range of industries including technology, healthcare, finance, retail, manufacturing, education, entertainment, and more. If you work in a niche industry, Chatsector will provide the best available information and let you know if certain details are limited."
    }
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-chatsector-light-gray">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="section-title mb-6 animate-fade-up">
            Frequently Asked <span className="text-chatsector-orange">Questions</span>
          </h2>
          <p className="section-description animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Get answers to common questions about Chatsector and how it can help you navigate your industry.
          </p>
        </div>

        <Accordion type="single" collapsible className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="mb-4 bg-white border border-chatsector-light-gray rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:text-chatsector-orange transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-chatsector-dark-gray/80 border-t border-chatsector-light-gray">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
