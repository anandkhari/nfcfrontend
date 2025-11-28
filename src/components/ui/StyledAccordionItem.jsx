import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const StyledAccordionItem = ({ value, icon: Icon, title, children }) => {
  return (
    <AccordionItem
      value={value}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-0 overflow-hidden"
    >
      <AccordionTrigger
        className="flex items-center justify-between px-6 py-3 text-lg font-semibold text-gray-900 hover:no-underline w-full"
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon className="h-5 w-5 text-gray-500" />}
          {title}
        </span>
      </AccordionTrigger>

      <AccordionContent className="px-6 pb-6 pt-0">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};
