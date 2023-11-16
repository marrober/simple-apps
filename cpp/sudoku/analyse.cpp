#include "definitions.h"
#include "cell.h"

bool compareToFixedRowValues(int rowCounter, int columnCounter, cell cells[][GRID_SIZE], int possibleValue) {

    bool matchFound = false;
    for (int compareColumnCounter = 0; compareColumnCounter < GRID_SIZE; compareColumnCounter++) {
        if (compareColumnCounter != columnCounter) {
            if (cells[rowCounter][compareColumnCounter].isFixedValue()) {
                if (possibleValue == cells[rowCounter][compareColumnCounter].getValue()) {
                    // match found...
                    matchFound = true; 
                }
            }
        }
    }
    return(matchFound);
}

bool compareToFixedColumnValues(int rowCounter, int columnCounter, cell cells[][GRID_SIZE], int possibleValue) {

    bool matchFound = false;
    for (int compareRowCounter = 0; compareRowCounter < GRID_SIZE; compareRowCounter++) {
        if (compareRowCounter != rowCounter) {
            if (cells[compareRowCounter][columnCounter].isFixedValue()) {
                if (possibleValue == cells[compareRowCounter][columnCounter].getValue()) {
                    // match found...
                    matchFound = true;
                }
            }
        }
    }
    return(matchFound);
}

bool compareToGridValues(int rowCounter, int columnCounter, cell cells[][GRID_SIZE], int possibleValue) {

    bool matchFound = false;
    for (int compareColumnCounter = 0; compareColumnCounter < GRID_SIZE; compareColumnCounter++) {
        for (int compareRowCounter = 0; compareRowCounter < GRID_SIZE; compareRowCounter++) {
            if ((compareRowCounter != rowCounter) && (compareColumnCounter != columnCounter)) {
                if (cells[rowCounter][columnCounter].getGridGroup() == cells[compareRowCounter][compareColumnCounter].getGridGroup()) {
                    if (cells[compareRowCounter][compareColumnCounter].isFixedValue()) {
                        if (possibleValue == cells[compareRowCounter][compareColumnCounter].getValue()) {
                            // match found...
                            matchFound = true;    
                        }
                    }
                }
            }
        }
    }
    return(matchFound);
}

void fixCellIfPossible(int rowCounter, int columnCounter, cell cells[][GRID_SIZE]) {
    if ((!cells[rowCounter][columnCounter].isFixedValue()) && (cells[rowCounter][columnCounter].getNumRemainingValues() == 1)) {
        // printf("Fixing cell %d %d\n", rowCounter, columnCounter);
        cells[rowCounter][columnCounter].setValue(cells[rowCounter][columnCounter].getCurrentPossibleValue());
    }

}