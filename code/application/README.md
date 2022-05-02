Zhifan:

1. remove "grant_table" checking by following step 1,2,3 of https://stackoverflow.com/questions/41645309/mysql-error-access-denied-for-user-rootlocalhost
T (https://stackoverflow.com/questions/41645309/mysql-error-access-denied-for-user-rootlocalhost)o confirm, check if you can now login to your vagrant's mysql using mysql -h 127.0.0.1 -u vagrant

2. If yes, then perform want Alex said in the group:

 - go to COMS10012/code/jdbc
 - Add spring boot stuff following https://stackoverflow.com/questions/30855864/maven-no-plugin-found-for-prefix-spring-boot-in-the-current-project-and-in-th
 - Edit the line 11 of Example.java to remove the localSocket reference, so the line should look like this: public static String CS = "jdbc:mariadb://localhost:3306/elections?user=vagrant";
 - run mvn spring-boot:run , and the program should execute normally and you can see some print-outs of the database.

3. 
 -   If you can reach this point, you should be able to connect to your vagrant's database now.
