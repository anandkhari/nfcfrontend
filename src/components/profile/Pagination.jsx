import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * A "dumb" presentational component for pagination.
 * It is fully controlled by the parent.
 * * - 'currentPage' and 'totalPages' determine its state.
 * - 'onPageChange' is the function it calls when a button is clicked.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // If there's only one page, don't render anything
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-between">
      {/* Previous Button */}
      <button
        // Calls the parent function with the new page number
        onClick={() => onPageChange(currentPage - 1)}
        // Disabled if on the first page
        disabled={currentPage === 1}
        className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>

      {/* Page Count */}
      <span className="text-sm text-brand-gray">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        // Calls the parent function with the new page number
        onClick={() => onPageChange(currentPage + 1)}
        // Disabled if on the last page
        disabled={currentPage === totalPages}
        className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;