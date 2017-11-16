package intellead;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @Autowired
    CustomerRepository customerRepository;

    @RequestMapping("/auth/{token}")
    public Customer auth(@PathVariable String token) {
        Customer customer = customerRepository.findByToken(token);
        if (customer == null) {
            throw new InvalidTokenException();
        }
        return customer;
    }

}