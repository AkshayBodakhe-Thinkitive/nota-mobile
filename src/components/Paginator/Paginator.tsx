import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';

interface PaginatorProps {
  currentPage: number;   // This should be passed as a 0-indexed value from the backend
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({ currentPage, totalPages, onPageChange }: PaginatorProps) => {
  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    if (startPage > 0) {
      pages.push(
        <TouchableOpacity
          key={1}
          style={[styles.pageNumber, currentPage === 0 && styles.currentPageNumber]}
          onPress={() => onPageChange(0)}>
          <Text style={[currentPage === 0 ? styles.currentPageNumberText : styles.pageNumberText]}>1</Text>
        </TouchableOpacity>,
      );
      if (startPage > 1) {
        pages.push(<Text key="start-ellipsis" style={styles.ellipsis}>...</Text>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity
          key={i + 1}
          style={[styles.pageNumber, currentPage === i && styles.currentPageNumber]}
          onPress={() => onPageChange(i)}>
          <Text style={[currentPage === i ? styles.currentPageNumberText : styles.pageNumberText]}>{i + 1}</Text>
        </TouchableOpacity>,
      );
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(<Text key="end-ellipsis" style={styles.ellipsis}>...</Text>);
      }
      pages.push(
        <TouchableOpacity
          key={totalPages}
          style={[styles.pageNumber, currentPage === totalPages - 1 && styles.currentPageNumber]}
          onPress={() => onPageChange(totalPages - 1)}>
          <Text style={styles.pageNumberText}>{totalPages}</Text>
        </TouchableOpacity>,
      );
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 0 && styles.disabledButton]}
        onPress={handlePrev}
        disabled={currentPage === 0}>
        <Text style={styles.buttonText}>Prev</Text>
      </TouchableOpacity>
      <View style={styles.pageNumbersContainer}>{renderPageNumbers()}</View>
      <TouchableOpacity
        style={[
          styles.button,
          currentPage === totalPages - 1 && styles.disabledButton,
        ]}
        onPress={handleNext}
        disabled={currentPage === totalPages - 1}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  button: {
    padding: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: colors.grey40,
  },
  buttonText: {
    color: colors.white,
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNumber: {
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  currentPageNumber: {
    backgroundColor: colors.primary,
  },
  currentPageNumberText: {
    color: colors.white,
  },
  pageNumberText: {
    color: colors.black,
  },
  ellipsis: {
    marginHorizontal: 5,
    color: colors.black,
  },
});

export default Paginator;
