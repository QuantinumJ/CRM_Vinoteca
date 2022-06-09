package goodsmell.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import goodsmell.domain.enumeration.FormaPago;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Venta.
 */
@Entity
@Table(name = "venta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Venta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha_hora")
    private Instant fechaHora;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "total_neto")
    private Double totalNeto;

    @Column(name = "total_pagar")
    private Double totalPagar;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_de_pago")
    private FormaPago tipoDePago;

    @JsonIgnoreProperties(value = { "cliente", "empresa" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Factura factura;

    @ManyToOne
    @JsonIgnoreProperties(value = { "empresa" }, allowSetters = true)
    private Empleado empleado;

    @ManyToOne
    private VinoTinto vinoTinto;

    @ManyToOne
    private VinoRosado vinoRosado;

    @ManyToOne
    private VinoBlanco vinoBlanco;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Venta id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaHora() {
        return this.fechaHora;
    }

    public Venta fechaHora(Instant fechaHora) {
        this.setFechaHora(fechaHora);
        return this;
    }

    public void setFechaHora(Instant fechaHora) {
        this.fechaHora = fechaHora;
    }

    public Integer getCantidad() {
        return this.cantidad;
    }

    public Venta cantidad(Integer cantidad) {
        this.setCantidad(cantidad);
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getTotalNeto() {
        return this.totalNeto;
    }

    public Venta totalNeto(Double totalNeto) {
        this.setTotalNeto(totalNeto);
        return this;
    }

    public void setTotalNeto(Double totalNeto) {
        this.totalNeto = totalNeto;
    }

    public Double getTotalPagar() {
        return this.totalPagar;
    }

    public Venta totalPagar(Double totalPagar) {
        this.setTotalPagar(totalPagar);
        return this;
    }

    public void setTotalPagar(Double totalPagar) {
        this.totalPagar = totalPagar;
    }

    public FormaPago getTipoDePago() {
        return this.tipoDePago;
    }

    public Venta tipoDePago(FormaPago tipoDePago) {
        this.setTipoDePago(tipoDePago);
        return this;
    }

    public void setTipoDePago(FormaPago tipoDePago) {
        this.tipoDePago = tipoDePago;
    }

    public Factura getFactura() {
        return this.factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public Venta factura(Factura factura) {
        this.setFactura(factura);
        return this;
    }

    public Empleado getEmpleado() {
        return this.empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Venta empleado(Empleado empleado) {
        this.setEmpleado(empleado);
        return this;
    }

    public VinoTinto getVinoTinto() {
        return this.vinoTinto;
    }

    public void setVinoTinto(VinoTinto vinoTinto) {
        this.vinoTinto = vinoTinto;
    }

    public Venta vinoTinto(VinoTinto vinoTinto) {
        this.setVinoTinto(vinoTinto);
        return this;
    }

    public VinoRosado getVinoRosado() {
        return this.vinoRosado;
    }

    public void setVinoRosado(VinoRosado vinoRosado) {
        this.vinoRosado = vinoRosado;
    }

    public Venta vinoRosado(VinoRosado vinoRosado) {
        this.setVinoRosado(vinoRosado);
        return this;
    }

    public VinoBlanco getVinoBlanco() {
        return this.vinoBlanco;
    }

    public void setVinoBlanco(VinoBlanco vinoBlanco) {
        this.vinoBlanco = vinoBlanco;
    }

    public Venta vinoBlanco(VinoBlanco vinoBlanco) {
        this.setVinoBlanco(vinoBlanco);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Venta)) {
            return false;
        }
        return id != null && id.equals(((Venta) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Venta{" +
            "id=" + getId() +
            ", fechaHora='" + getFechaHora() + "'" +
            ", cantidad=" + getCantidad() +
            ", totalNeto=" + getTotalNeto() +
            ", totalPagar=" + getTotalPagar() +
            ", tipoDePago='" + getTipoDePago() + "'" +
            "}";
    }
}
