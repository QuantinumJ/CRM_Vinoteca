package goodsmell.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Caja.
 */
@Entity
@Table(name = "caja")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Caja implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha_dia")
    private LocalDate fechaDia;

    @Column(name = "total_dia")
    private Double totalDia;

    @Column(name = "valor_inicial")
    private Double valorInicial;

    @ManyToOne
    @JsonIgnoreProperties(value = { "factura", "empleado", "vinoTinto", "vinoRosado", "vinoBlanco" }, allowSetters = true)
    private Venta venta;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Caja id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaDia() {
        return this.fechaDia;
    }

    public Caja fechaDia(LocalDate fechaDia) {
        this.setFechaDia(fechaDia);
        return this;
    }

    public void setFechaDia(LocalDate fechaDia) {
        this.fechaDia = fechaDia;
    }

    public Double getTotalDia() {
        return this.totalDia;
    }

    public Caja totalDia(Double totalDia) {
        this.setTotalDia(totalDia);
        return this;
    }

    public void setTotalDia(Double totalDia) {
        this.totalDia = totalDia;
    }

    public Double getValorInicial() {
        return this.valorInicial;
    }

    public Caja valorInicial(Double valorInicial) {
        this.setValorInicial(valorInicial);
        return this;
    }

    public void setValorInicial(Double valorInicial) {
        this.valorInicial = valorInicial;
    }

    public Venta getVenta() {
        return this.venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Caja venta(Venta venta) {
        this.setVenta(venta);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Caja)) {
            return false;
        }
        return id != null && id.equals(((Caja) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Caja{" +
            "id=" + getId() +
            ", fechaDia='" + getFechaDia() + "'" +
            ", totalDia=" + getTotalDia() +
            ", valorInicial=" + getValorInicial() +
            "}";
    }
}
