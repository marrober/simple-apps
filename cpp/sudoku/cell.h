class cell {
private:
    int assignedNumber;
    int possibleValues[GRID_SIZE];
    int numberRemainingPossibleValues;
    BINARY fixedValue;
    int gridGroup;
    int possibleValueIndex;
    int trialValue;
    cell *ptrNextCell;

public:
    cell(void);
    int getNumRemainingValues(void);
    void setValue(int);
    int getValue(void);
    void setGridGroup(int);
    int getGridGroup(void);
    BINARY isFixedValue(void);
    int getNextPossibleValue();
    bool possibleValuesEnd();
    void removePossibleValue(int);
    int getCurrentPossibleValue(void);
    void setTrialValue(int);
    int getTrialValue(void);
    void setNextCellPtr(cell*);
    cell& getNextCellPtr();
};
