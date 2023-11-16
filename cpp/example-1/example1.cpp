#include <string>
#include <stdio.h>
#include <iostream>

class TestClass {       
    public:             
        int aNumber = 0;        
        std::string aString = "";  
    int getNumber() {
        return aNumber;
    }
    std::string getString() {
        return aString;
    }
    void setNumber(int newNumber) {
        aNumber = newNumber;
    }
    void setString(std::string newString) {
        aString = newString;
    }
};

int main() {
    TestClass myTestClass;

    myTestClass.setNumber(3000);
    myTestClass.setString("Mark");

    std::cout << "Simple test app\n";
    std::cout << "Number: " << myTestClass.getNumber() << "\n";
    std::cout << "String: " << myTestClass.getString() << "\n";

    return(0);
}