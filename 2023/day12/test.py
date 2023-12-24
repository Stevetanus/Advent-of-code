def arrange_students(spaces, students, current_arrangement=[]):
    if spaces == 0:
        print(current_arrangement)
        return
    for i in range(students + 1):
        new_arrangement = current_arrangement + [i]
        arrange_students(spaces - 1, students, new_arrangement)

spaces_available = 10
students_to_arrange = 7
arrange_students(spaces_available, students_to_arrange)
