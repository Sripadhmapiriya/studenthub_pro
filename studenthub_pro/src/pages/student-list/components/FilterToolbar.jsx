import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  courseFilter,
  onCourseFilterChange,
  yearFilter,
  onYearFilterChange,
  selectedStudents,
  onBulkDelete,
  onBulkEdit,
  onExportData,
  totalStudents,
  filteredCount,
  isLoading
}) => {
  const navigate = useNavigate();
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'graduated', label: 'Graduated' }
  ];

  const courseOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Business Administration', label: 'Business Administration' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Psychology', label: 'Psychology' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English Literature', label: 'English Literature' },
    { value: 'History', label: 'History' }
  ];

  const yearOptions = [
    { value: 'all', label: 'All Years' },
    { value: '1', label: 'Year 1' },
    { value: '2', label: 'Year 2' },
    { value: '3', label: 'Year 3' },
    { value: '4', label: 'Year 4' }
  ];

  const handleExportToggle = () => {
    setIsExportMenuOpen(!isExportMenuOpen);
  };

  const handleExport = (format) => {
    onExportData(format, selectedStudents);
    setIsExportMenuOpen(false);
  };

  const hasSelectedItems = selectedStudents?.length > 0;
  const hasFilters = searchValue || filterValue !== 'all' || courseFilter !== 'all' || yearFilter !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-elevation-1">
      {/* Header with counts */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Student Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {hasFilters ? (
              <>Showing {filteredCount} of {totalStudents} students</>
            ) : (
              <>Total {totalStudents} students</>
            )}
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => navigate('/add-student')}
          iconName="UserPlus"
          iconPosition="left"
          disabled={isLoading}
          className="gradient-primary"
        >
          Add Student
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search by name, email, or ID..."
            value={searchValue}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <Select
          options={statusOptions}
          value={filterValue}
          onChange={onFilterChange}
          placeholder="Filter by status"
        />

        <Select
          options={courseOptions}
          value={courseFilter}
          onChange={onCourseFilterChange}
          placeholder="Filter by course"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          options={yearOptions}
          value={yearFilter}
          onChange={onYearFilterChange}
          placeholder="Filter by year"
        />

        {/* Export Menu */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={handleExportToggle}
            iconName="Download"
            iconPosition="left"
            disabled={isLoading}
            fullWidth
          >
            Export Data
          </Button>

          {isExportMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-popover border border-border rounded-lg shadow-elevation-3 py-1 z-10">
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
              >
                <Icon name="FileText" size={16} />
                <span>Export as CSV</span>
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
              >
                <Icon name="FileSpreadsheet" size={16} />
                <span>Export as Excel</span>
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
              >
                <Icon name="FileDown" size={16} />
                <span>Export as PDF</span>
              </button>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <Button
            variant="ghost"
            onClick={() => {
              onSearchChange('');
              onFilterChange('all');
              onCourseFilterChange('all');
              onYearFilterChange('all');
            }}
            iconName="X"
            iconPosition="left"
            fullWidth
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Bulk Actions */}
      {hasSelectedItems && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-foreground">
              {selectedStudents?.length} student{selectedStudents?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkEdit}
                iconName="Edit"
                iconPosition="left"
                disabled={isLoading}
              >
                Bulk Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkDelete}
                iconName="Trash2"
                iconPosition="left"
                disabled={isLoading}
                className="text-destructive hover:text-destructive"
              >
                Delete Selected
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBulkEdit([])}
            iconName="X"
            iconPosition="left"
          >
            Clear Selection
          </Button>
        </div>
      )}
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground">{totalStudents}</div>
          <div className="text-xs text-muted-foreground">Total Students</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-success">{Math.floor(totalStudents * 0.85)}</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-warning">{Math.floor(totalStudents * 0.1)}</div>
          <div className="text-xs text-muted-foreground">Inactive</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-accent">{Math.floor(totalStudents * 0.05)}</div>
          <div className="text-xs text-muted-foreground">Graduated</div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;