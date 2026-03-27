package com.vmis;

import com.vmis.config.FrontendProperties;
import com.vmis.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperties.class, FrontendProperties.class})
public class VmisApplication {
    public static void main(String[] args) {
        SpringApplication.run(VmisApplication.class, args);
    }
}