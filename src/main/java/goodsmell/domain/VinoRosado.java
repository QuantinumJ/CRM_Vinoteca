package goodsmell.domain;

import goodsmell.domain.enumeration.DomOrg;
import goodsmell.domain.enumeration.UvaBlanca;
import goodsmell.domain.enumeration.UvaTinta;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A VinoRosado.
 */
@Entity
@Table(name = "vino_rosado")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class VinoRosado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "bodega")
    private String bodega;

    @Enumerated(EnumType.STRING)
    @Column(name = "denominacion_origen")
    private DomOrg denominacionOrigen;

    @Column(name = "ano_cosecha")
    private LocalDate anoCosecha;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "maduracion")
    private String maduracion;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "cata")
    private String cata;

    @Column(name = "pureza_vino")
    private Double purezaVino;

    @Column(name = "precio_bruto")
    private Double precioBruto;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_uva_tinta")
    private UvaTinta tipoUvaTinta;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_uva_blanca")
    private UvaBlanca tipoUvaBlanca;

    @Column(name = "stock")
    private Integer stock;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public VinoRosado id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBodega() {
        return this.bodega;
    }

    public VinoRosado bodega(String bodega) {
        this.setBodega(bodega);
        return this;
    }

    public void setBodega(String bodega) {
        this.bodega = bodega;
    }

    public DomOrg getDenominacionOrigen() {
        return this.denominacionOrigen;
    }

    public VinoRosado denominacionOrigen(DomOrg denominacionOrigen) {
        this.setDenominacionOrigen(denominacionOrigen);
        return this;
    }

    public void setDenominacionOrigen(DomOrg denominacionOrigen) {
        this.denominacionOrigen = denominacionOrigen;
    }

    public LocalDate getAnoCosecha() {
        return this.anoCosecha;
    }

    public VinoRosado anoCosecha(LocalDate anoCosecha) {
        this.setAnoCosecha(anoCosecha);
        return this;
    }

    public void setAnoCosecha(LocalDate anoCosecha) {
        this.anoCosecha = anoCosecha;
    }

    public String getNombre() {
        return this.nombre;
    }

    public VinoRosado nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getMaduracion() {
        return this.maduracion;
    }

    public VinoRosado maduracion(String maduracion) {
        this.setMaduracion(maduracion);
        return this;
    }

    public void setMaduracion(String maduracion) {
        this.maduracion = maduracion;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public VinoRosado descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCata() {
        return this.cata;
    }

    public VinoRosado cata(String cata) {
        this.setCata(cata);
        return this;
    }

    public void setCata(String cata) {
        this.cata = cata;
    }

    public Double getPurezaVino() {
        return this.purezaVino;
    }

    public VinoRosado purezaVino(Double purezaVino) {
        this.setPurezaVino(purezaVino);
        return this;
    }

    public void setPurezaVino(Double purezaVino) {
        this.purezaVino = purezaVino;
    }

    public Double getPrecioBruto() {
        return this.precioBruto;
    }

    public VinoRosado precioBruto(Double precioBruto) {
        this.setPrecioBruto(precioBruto);
        return this;
    }

    public void setPrecioBruto(Double precioBruto) {
        this.precioBruto = precioBruto;
    }

    public UvaTinta getTipoUvaTinta() {
        return this.tipoUvaTinta;
    }

    public VinoRosado tipoUvaTinta(UvaTinta tipoUvaTinta) {
        this.setTipoUvaTinta(tipoUvaTinta);
        return this;
    }

    public void setTipoUvaTinta(UvaTinta tipoUvaTinta) {
        this.tipoUvaTinta = tipoUvaTinta;
    }

    public UvaBlanca getTipoUvaBlanca() {
        return this.tipoUvaBlanca;
    }

    public VinoRosado tipoUvaBlanca(UvaBlanca tipoUvaBlanca) {
        this.setTipoUvaBlanca(tipoUvaBlanca);
        return this;
    }

    public void setTipoUvaBlanca(UvaBlanca tipoUvaBlanca) {
        this.tipoUvaBlanca = tipoUvaBlanca;
    }

    public Integer getStock() {
        return this.stock;
    }

    public VinoRosado stock(Integer stock) {
        this.setStock(stock);
        return this;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VinoRosado)) {
            return false;
        }
        return id != null && id.equals(((VinoRosado) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VinoRosado{" +
            "id=" + getId() +
            ", bodega='" + getBodega() + "'" +
            ", denominacionOrigen='" + getDenominacionOrigen() + "'" +
            ", anoCosecha='" + getAnoCosecha() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", maduracion='" + getMaduracion() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", cata='" + getCata() + "'" +
            ", purezaVino=" + getPurezaVino() +
            ", precioBruto=" + getPrecioBruto() +
            ", tipoUvaTinta='" + getTipoUvaTinta() + "'" +
            ", tipoUvaBlanca='" + getTipoUvaBlanca() + "'" +
            ", stock=" + getStock() +
            "}";
    }
}
