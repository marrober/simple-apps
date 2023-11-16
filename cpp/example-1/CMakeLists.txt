cmake_minimum_required(VERSION 3.10)

# set the project name
project(example1)

# add the executable
set(EXECUTABLE_OUTPUT_PATH "bin")
add_executable(bin.out example1.cpp)