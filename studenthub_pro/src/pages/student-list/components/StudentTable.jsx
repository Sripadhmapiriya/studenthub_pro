import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentTable = ({ 
  students, 
  selectedStudents, 
  onSelectStudent, 
  onSelectAll, 
  sortConfig, 
  onSort, 
  onViewStudent, 
  onEditStudent, 
  onDeleteStudent,
  isLoading 
}) => {
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  const handleDeleteClick = (student) => {
    setDeleteConfirm(student);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      onDeleteStudent(deleteConfirm?.id);
      setDeleteConfirm(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      graduated: { color: 'bg-accent text-accent-foreground', label: 'Graduated' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="border-b border-border p-4">
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 7 })?.map((_, index) => (
                <div key={index} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
          {Array.from({ length: 5 })?.map((_, index) => (
            <div key={index} className="border-b border-border p-4">
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 })?.map((_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-muted rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="w-12 p-4">
                  <Checkbox
                    checked={selectedStudents?.length === students?.length && students?.length > 0}
                    onChange={(e) => onSelectAll(e?.target?.checked)}
                    indeterminate={selectedStudents?.length > 0 && selectedStudents?.length < students?.length}
                  />
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('id')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                  >
                    <span>ID</span>
                    {getSortIcon('id')}
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                  >
                    <span>Name</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                  >
                    <span>Email</span>
                    {getSortIcon('email')}
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('course')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                  >
                    <span>Course</span>
                    {getSortIcon('course')}
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('year')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                  >
                    <span>Year</span>
                    {getSortIcon('year')}
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                  >
                    <span>Status</span>
                    {getSortIcon('status')}
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                  >
                    <span>Created</span>
                    {getSortIcon('createdAt')}
                  </button>
                </th>
                <th className="text-center p-4">
                  <span className="text-sm font-medium text-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students?.map((student) => (
                <tr key={student?.id} className="hover:bg-muted/30 transition-micro">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedStudents?.includes(student?.id)}
                      onChange={(e) => onSelectStudent(student?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-muted-foreground">#{student?.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">
                          {student?.name?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{student?.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{student?.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{student?.course}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{student?.year}</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(student?.status)}
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{formatDate(student?.createdAt)}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewStudent(student)}
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditStudent(student)}
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(student)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {students?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => navigate('/add-student')}
              iconName="UserPlus"
              iconPosition="left"
            >
              Add First Student
            </Button>
          </div>
        )}
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {students?.map((student) => (
          <div key={student?.id} className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedStudents?.includes(student?.id)}
                  onChange={(e) => onSelectStudent(student?.id, e?.target?.checked)}
                />
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {student?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{student?.name}</h3>
                  <p className="text-xs text-muted-foreground">#{student?.id}</p>
                </div>
              </div>
              {getStatusBadge(student?.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{student?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{student?.course}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Year {student?.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created {formatDate(student?.createdAt)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewStudent(student)}
                iconName="Eye"
                iconPosition="left"
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStudent(student)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteClick(student)}
                iconName="Trash2"
                iconPosition="left"
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

        {students?.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => navigate('/add-student')}
              iconName="UserPlus"
              iconPosition="left"
            >
              Add First Student
            </Button>
          </div>
        )}
      </div>
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={handleDeleteCancel} />
          <div className="relative bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4 shadow-elevation-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Student</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? This will permanently remove their record from the system.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={handleDeleteCancel}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentTable;