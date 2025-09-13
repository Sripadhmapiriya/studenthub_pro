import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import FilterToolbar from './components/FilterToolbar';
import StudentTable from './components/StudentTable';
import PaginationControls from './components/PaginationControls';
import BulkActionModal from './components/BulkActionModal';

const StudentList = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const mockUser = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@studenthub.edu"
  };

  // State management
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [bulkActionModal, setBulkActionModal] = useState({ isOpen: false, type: null });
  const [students, setStudents] = useState([]);

  // Mock student data with Indian locations
  const initialStudents = [
    {
      id: "STU001",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      course: "Computer Science",
      year: "3",
      status: "active",
      phone: "+91 9876543210",
      location: "Mumbai, MH",
      createdAt: "2023-09-15T10:30:00Z"
    },
    {
      id: "STU002",
      name: "Rahul Verma",
      email: "rahul.verma@email.com",
      course: "Business Administration",
      year: "2",
      status: "active",
      phone: "+91 9876543211",
      location: "Delhi, DL",
      createdAt: "2023-08-22T14:15:00Z"
    },
    {
      id: "STU003",
      name: "Anjali Patel",
      email: "anjali.patel@email.com",
      course: "Engineering",
      year: "4",
      status: "graduated",
      phone: "+91 9876543212",
      location: "Bangalore, KA",
      createdAt: "2023-07-10T09:45:00Z"
    },
    {
      id: "STU004",
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      course: "Psychology",
      year: "1",
      status: "active",
      phone: "+91 9876543213",
      location: "Chennai, TN",
      createdAt: "2023-09-01T16:20:00Z"
    },
    {
      id: "STU005",
      name: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      course: "Biology",
      year: "3",
      status: "inactive",
      phone: "+91 9876543214",
      location: "Pune, MH",
      createdAt: "2023-06-18T11:30:00Z"
    },
    {
      id: "STU006",
      name: "Arjun Kumar",
      email: "arjun.kumar@email.com",
      course: "Mathematics",
      year: "2",
      status: "active",
      phone: "+91 9876543215",
      location: "Hyderabad, TG",
      createdAt: "2023-08-05T13:45:00Z"
    },
    {
      id: "STU007",
      name: "Kavya Reddy",
      email: "kavya.reddy@email.com",
      course: "English Literature",
      year: "4",
      status: "active",
      phone: "+91 9876543216",
      location: "Kolkata, WB",
      createdAt: "2023-05-12T08:15:00Z"
    },
    {
      id: "STU008",
      name: "Rohit Joshi",
      email: "rohit.joshi@email.com",
      course: "History",
      year: "1",
      status: "active",
      phone: "+91 9876543217",
      location: "Ahmedabad, GJ",
      createdAt: "2023-09-08T12:00:00Z"
    },
    {
      id: "STU009",
      name: "Meera Iyer",
      email: "meera.iyer@email.com",
      course: "Computer Science",
      year: "3",
      status: "active",
      phone: "+91 9876543218",
      location: "Coimbatore, TN",
      createdAt: "2023-07-25T15:30:00Z"
    },
    {
      id: "STU010",
      name: "Karan Malhotra",
      email: "karan.malhotra@email.com",
      course: "Business Administration",
      year: "2",
      status: "inactive",
      phone: "+91 9876543219",
      location: "Jaipur, RJ",
      createdAt: "2023-06-30T10:45:00Z"
    },
    {
      id: "STU011",
      name: "Pooja Agarwal",
      email: "pooja.agarwal@email.com",
      course: "Engineering",
      year: "4",
      status: "graduated",
      phone: "+91 9876543220",
      location: "Lucknow, UP",
      createdAt: "2023-05-20T14:20:00Z"
    },
    {
      id: "STU012",
      name: "Amit Pandey",
      email: "amit.pandey@email.com",
      course: "Psychology",
      year: "1",
      status: "active",
      phone: "+91 9876543221",
      location: "Bhopal, MP",
      createdAt: "2023-09-12T09:10:00Z"
    },
    {
      id: "STU013",
      name: "Riya Kapoor",
      email: "riya.kapoor@email.com",
      course: "Biology",
      year: "3",
      status: "active",
      phone: "+91 9876543222",
      location: "Chandigarh, CH",
      createdAt: "2023-08-18T16:55:00Z"
    },
    {
      id: "STU014",
      name: "Deepak Yadav",
      email: "deepak.yadav@email.com",
      course: "Mathematics",
      year: "2",
      status: "active",
      phone: "+91 9876543223",
      location: "Indore, MP",
      createdAt: "2023-07-03T11:25:00Z"
    },
    {
      id: "STU015",
      name: "Swati Nair",
      email: "swati.nair@email.com",
      course: "English Literature",
      year: "4",
      status: "active",
      phone: "+91 9876543224",
      location: "Kochi, KL",
      createdAt: "2023-06-08T13:40:00Z"
    }
  ];

  // Initialize students state
  useEffect(() => {
    // Load students from localStorage and merge with initial data
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const allStudents = [...initialStudents, ...savedStudents];
    setStudents(allStudents);
  }, []);

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode?.toString());
  }, [isDarkMode]);

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students?.filter(student => {
      const matchesSearch = !searchValue || 
        student?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        student?.email?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        student?.id?.toLowerCase()?.includes(searchValue?.toLowerCase());
      
      const matchesStatus = filterValue === 'all' || student?.status === filterValue;
      const matchesCourse = courseFilter === 'all' || student?.course === courseFilter;
      const matchesYear = yearFilter === 'all' || student?.year === yearFilter;
      
      return matchesSearch && matchesStatus && matchesCourse && matchesYear;
    });

    // Sort students
    filtered?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [students, searchValue, filterValue, courseFilter, yearFilter, sortConfig]);

  // Paginated students
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedStudents?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedStudents, currentPage, itemsPerPage]);

  // Event handlers
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleSelectStudent = (studentId, isSelected) => {
    if (isSelected) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev?.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedStudents(paginatedStudents?.map(student => student?.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedStudents([]);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectedStudents([]);
  };

  const handleViewStudent = (student) => {
    navigate('/student-profile', { state: { student } });
  };

  const handleEditStudent = (student) => {
    navigate('/edit-student', { state: { student } });
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      console.log('Deleting student:', studentId);
      
      // Remove from selected students
      setSelectedStudents(prev => prev?.filter(id => id !== studentId));
      
      // Remove from the main student list
      setStudents(prev => {
        const updatedStudents = prev.filter(student => student.id !== studentId);
        
        // Update localStorage - only save the added students (not initial mock data)
        const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
        const updatedSavedStudents = savedStudents.filter(student => student.id !== studentId);
        localStorage.setItem('students', JSON.stringify(updatedSavedStudents));
        
        return updatedStudents;
      });
      
      // Show success message
      alert('Student deleted successfully');
    }
  };

  const handleBulkDelete = () => {
    const studentsToDelete = students?.filter(student => 
      selectedStudents?.includes(student?.id)
    );
    setBulkActionModal({ isOpen: true, type: 'delete', students: studentsToDelete });
  };

  const handleBulkEdit = () => {
    const studentsToEdit = students?.filter(student => 
      selectedStudents?.includes(student?.id)
    );
    setBulkActionModal({ isOpen: true, type: 'edit', students: studentsToEdit });
  };

  const handleBulkActionConfirm = (data) => {
    console.log('Bulk action confirmed:', bulkActionModal?.type, data);
    // In real app, this would make an API call
    setBulkActionModal({ isOpen: false, type: null, students: [] });
    setSelectedStudents([]);
  };

  const handleExportData = (format, selectedIds) => {
    const dataToExport = selectedIds?.length > 0 
      ? students?.filter(student => selectedIds?.includes(student?.id))
      : filteredAndSortedStudents;
    
    console.log(`Exporting ${dataToExport?.length} students as ${format}`);
    // In real app, this would generate and download the file
  };

  const totalPages = Math.ceil(filteredAndSortedStudents?.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={mockUser}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs />
          
          <FilterToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            courseFilter={courseFilter}
            onCourseFilterChange={setCourseFilter}
            yearFilter={yearFilter}
            onYearFilterChange={setYearFilter}
            selectedStudents={selectedStudents}
            onBulkDelete={handleBulkDelete}
            onBulkEdit={handleBulkEdit}
            onExportData={handleExportData}
            totalStudents={students?.length}
            filteredCount={filteredAndSortedStudents?.length}
            isLoading={isLoading}
          />

          <StudentTable
            students={paginatedStudents}
            selectedStudents={selectedStudents}
            onSelectStudent={handleSelectStudent}
            onSelectAll={handleSelectAll}
            sortConfig={sortConfig}
            onSort={handleSort}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            isLoading={isLoading}
          />

          {!isLoading && filteredAndSortedStudents?.length > 0 && (
            <div className="mt-6">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedStudents?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </main>
      <BulkActionModal
        isOpen={bulkActionModal?.isOpen}
        onClose={() => setBulkActionModal({ isOpen: false, type: null, students: [] })}
        selectedStudents={bulkActionModal?.students || []}
        actionType={bulkActionModal?.type}
        onConfirm={handleBulkActionConfirm}
        isLoading={false}
      />
    </div>
  );
};

export default StudentList;