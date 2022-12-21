#include <string>
#include <iostream>

class TestClass {       
  public:             
    int aNumber;        
    std::string aString;  
};

int main() {
    TestClass myTestClass;

    myTestClass.aNumber = 1000;
    myTestClass.aString = "Mark";

    std::cout << myTestClass.aNumber << "\n";
    std::cout << myTestClass.aString << "\n";

    return(0);
}