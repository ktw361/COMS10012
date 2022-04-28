This sub-repo is for testing connection to remote mysql

Steps:
- Add spring boot stuff following https://stackoverflow.com/questions/30855864/maven-no-plugin-found-for-prefix-spring-boot-in-the-current-project-and-in-th
- Edit the line 11 of Example.java to remove the localSocket reference, so the line should look like this: `public static String CS = "jdbc:mariadb://localhost:3306/elections?user=vagrant";`
