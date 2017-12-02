/*
 *
 * Copyright 2017 Softplan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
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