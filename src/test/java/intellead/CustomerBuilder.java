package intellead;

public class CustomerBuilder {

    private int id;
    private String name;
    private String token;

    public static CustomerBuilder customerWith() {
        return new CustomerBuilder();
    }

    public CustomerBuilder id(int id) {
        this.id = id;
        return this;
    }

    public CustomerBuilder name(String name) {
        this.name = name;
        return this;
    }

    public CustomerBuilder token(String token) {
        this.token = token;
        return this;
    }

    public Customer build() {
        Customer customer = new Customer();
        customer.setId(id);
        customer.setName(name);
        customer.setToken(token);
        return customer;
    }
}
