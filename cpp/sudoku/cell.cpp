#include "definitions.h"
#include "cell.h"
#include "stdio.h"

cell::cell(void) {
    for (int counter = 0; counter < GRID_SIZE; counter++) {
        possibleValues[counter] = counter + 1;
    }
    assignedNumber = 0;
    numberRemainingPossibleValues = GRID_SIZE;
    fixedValue = FALSE;
    possibleValueIndex = 0;
    trialValue = 0;
    ptrNextCell = nullptr;
}
int cell::getNumRemainingValues(void) {
    return (numberRemainingPossibleValues);
}
BINARY cell::isFixedValue(void) {
    return(fixedValue);
}
void cell::setValue(int newValue) {
    assignedNumber = newValue;
    numberRemainingPossibleValues = 0;
    fixedValue = TRUE;
}
int cell::getValue(void) {
    return(assignedNumber);
}
void cell::setGridGroup(int gridGroupValue) {
    gridGroup = gridGroupValue;
}
int cell::getGridGroup(void) {
    return(gridGroup);
}

void cell::removePossibleValue(int valueToRemove) {
    int skip = 0;
    bool valueIsInListToBeRemoved = false;

    for (int counter = 0; counter < numberRemainingPossibleValues; counter++) {
        if (possibleValues[counter] == valueToRemove) {
            valueIsInListToBeRemoved = true;
        }
    }

    if(valueIsInListToBeRemoved) {
        numberRemainingPossibleValues--;
        for (int counter = 0; counter < numberRemainingPossibleValues; counter++) {
            if (possibleValues[counter] == valueToRemove) {
                skip = 1;
            }
            possibleValues[counter] = possibleValues[counter + skip];
        }
        possibleValueIndex--;
        if (possibleValueIndex >= numberRemainingPossibleValues) {
           possibleValueIndex = (numberRemainingPossibleValues - 1);
        }
        // printf("removing value %d\n", valueToRemove);
    }
}
int cell::getNextPossibleValue() {
    if (possibleValueIndex < numberRemainingPossibleValues) {
        return(possibleValues[possibleValueIndex++]);
    } else{
        possibleValueIndex = 0;
        return(possibleValues[possibleValueIndex]);
    }
}
bool cell::possibleValuesEnd() {
    if (possibleValueIndex == numberRemainingPossibleValues) {
        return(true);
    } else {
        return(false);  
    }
}
int cell::getCurrentPossibleValue() {
    return(possibleValues[possibleValueIndex]);
}
void cell::setTrialValue(int trialValueToSet){
    trialValue = trialValueToSet;
}
int cell::getTrialValue() {
    return(trialValue);
}

void cell::setNextCellPtr(cell *ptrCell) {
    ptrNextCell = ptrCell;
}
cell& cell::getNextCellPtr() {
    return(*ptrNextCell);
}
