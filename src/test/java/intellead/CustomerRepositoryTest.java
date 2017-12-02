package intellead;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static intellead.CustomerBuilder.customerWith;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CustomerRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CustomerRepository customerRepository;

    @Before
    public void setup() {
        entityManager.persist(
                customerWith().name("intellead")
                              .token("asd")
                              .build());
    }

    @Test
    public void testFindByTokenInvalid() {
        Customer customer = customerRepository.findByToken("123");
        assertThat(customer).isNull();
    }

    @Test
    public void testFindByTokenValid() {
        Customer customer = customerRepository.findByToken("asd");
        assertThat(customer).isNotNull();
        assertThat(customer.getId()).isEqualTo(1);
        assertThat(customer.getName()).isEqualTo("intellead");
        assertThat(customer.getToken()).isEqualTo("asd");
    }

}