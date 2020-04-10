package by.bsuir.courseproject;

import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import javax.xml.crypto.Data;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class ConnectionPool {

    private static ConnectionPool instance;

    private static final int CONNECTION_NUMBER =5;
    private static final ReentrantLock INSTANCE_LOCK = new ReentrantLock();
    private static final ReentrantLock GET_OBJECT_LOCK = new ReentrantLock();
    private static AtomicBoolean init = new AtomicBoolean(false);

    private Queue<DataSource> sources;
    private List<DataSource> usedSources;

    private String driver;
    private String url;
    private String user;
    private String password;

    private ConnectionPool() {
    }

    public static ConnectionPool getInstance() {
        if(!init.get()) {
            INSTANCE_LOCK.lock();
            try {
                if(!init.get()) {
                    final ConnectionPool temp = new ConnectionPool();
                    instance = temp;
                    init.set(true);
                }
            } finally {
                INSTANCE_LOCK.unlock();
            }
        }
        return instance;
    }

    public void init() throws ClassNotFoundException {
        Class.forName(driver);
        sources = new ArrayDeque<>(5);
        usedSources = new ArrayList<>(5);
        for (int i = 0; i < CONNECTION_NUMBER; i++) {
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName(driver);
            dataSource.setUrl(url);
            dataSource.setPassword(password);
            dataSource.setUsername(user);
            sources.add(dataSource);
        }
    }


    public DataSource getConnection() {
        GET_OBJECT_LOCK.lock();
        DataSource source;
        try {
            source = sources.poll();
            usedSources.add(source);
        } finally {
            GET_OBJECT_LOCK.unlock();
        }

        return source;
    }


    public void setUrl(String url) {
        this.url = url;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getDriver() {
        return driver;
    }

    public String getUrl() {
        return url;
    }

    public String getUser() {
        return user;
    }

    public String getPassword() {
        return password;
    }

}
