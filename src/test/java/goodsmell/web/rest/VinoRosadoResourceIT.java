package goodsmell.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import goodsmell.IntegrationTest;
import goodsmell.domain.VinoRosado;
import goodsmell.domain.enumeration.DomOrg;
import goodsmell.domain.enumeration.UvaBlanca;
import goodsmell.domain.enumeration.UvaTinta;
import goodsmell.repository.VinoRosadoRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link VinoRosadoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VinoRosadoResourceIT {

    private static final String DEFAULT_BODEGA = "AAAAAAAAAA";
    private static final String UPDATED_BODEGA = "BBBBBBBBBB";

    private static final DomOrg DEFAULT_DENOMINACION_ORIGEN = DomOrg.ANDALUCIA;
    private static final DomOrg UPDATED_DENOMINACION_ORIGEN = DomOrg.ARAGON;

    private static final LocalDate DEFAULT_ANO_COSECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ANO_COSECHA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_MADURACION = "AAAAAAAAAA";
    private static final String UPDATED_MADURACION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_CATA = "AAAAAAAAAA";
    private static final String UPDATED_CATA = "BBBBBBBBBB";

    private static final Double DEFAULT_PUREZA_VINO = 1D;
    private static final Double UPDATED_PUREZA_VINO = 2D;

    private static final Double DEFAULT_PRECIO_BRUTO = 1D;
    private static final Double UPDATED_PRECIO_BRUTO = 2D;

    private static final UvaTinta DEFAULT_TIPO_UVA_TINTA = UvaTinta.BOBAL;
    private static final UvaTinta UPDATED_TIPO_UVA_TINTA = UvaTinta.BRANCELLAO;

    private static final UvaBlanca DEFAULT_TIPO_UVA_BLANCA = UvaBlanca.VERDEJO;
    private static final UvaBlanca UPDATED_TIPO_UVA_BLANCA = UvaBlanca.ALBARINO;

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;

    private static final String ENTITY_API_URL = "/api/vino-rosados";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VinoRosadoRepository vinoRosadoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVinoRosadoMockMvc;

    private VinoRosado vinoRosado;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VinoRosado createEntity(EntityManager em) {
        VinoRosado vinoRosado = new VinoRosado()
            .bodega(DEFAULT_BODEGA)
            .denominacionOrigen(DEFAULT_DENOMINACION_ORIGEN)
            .anoCosecha(DEFAULT_ANO_COSECHA)
            .nombre(DEFAULT_NOMBRE)
            .maduracion(DEFAULT_MADURACION)
            .descripcion(DEFAULT_DESCRIPCION)
            .cata(DEFAULT_CATA)
            .purezaVino(DEFAULT_PUREZA_VINO)
            .precioBruto(DEFAULT_PRECIO_BRUTO)
            .tipoUvaTinta(DEFAULT_TIPO_UVA_TINTA)
            .tipoUvaBlanca(DEFAULT_TIPO_UVA_BLANCA)
            .stock(DEFAULT_STOCK);
        return vinoRosado;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VinoRosado createUpdatedEntity(EntityManager em) {
        VinoRosado vinoRosado = new VinoRosado()
            .bodega(UPDATED_BODEGA)
            .denominacionOrigen(UPDATED_DENOMINACION_ORIGEN)
            .anoCosecha(UPDATED_ANO_COSECHA)
            .nombre(UPDATED_NOMBRE)
            .maduracion(UPDATED_MADURACION)
            .descripcion(UPDATED_DESCRIPCION)
            .cata(UPDATED_CATA)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO)
            .tipoUvaTinta(UPDATED_TIPO_UVA_TINTA)
            .tipoUvaBlanca(UPDATED_TIPO_UVA_BLANCA)
            .stock(UPDATED_STOCK);
        return vinoRosado;
    }

    @BeforeEach
    public void initTest() {
        vinoRosado = createEntity(em);
    }

    @Test
    @Transactional
    void createVinoRosado() throws Exception {
        int databaseSizeBeforeCreate = vinoRosadoRepository.findAll().size();
        // Create the VinoRosado
        restVinoRosadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoRosado)))
            .andExpect(status().isCreated());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeCreate + 1);
        VinoRosado testVinoRosado = vinoRosadoList.get(vinoRosadoList.size() - 1);
        assertThat(testVinoRosado.getBodega()).isEqualTo(DEFAULT_BODEGA);
        assertThat(testVinoRosado.getDenominacionOrigen()).isEqualTo(DEFAULT_DENOMINACION_ORIGEN);
        assertThat(testVinoRosado.getAnoCosecha()).isEqualTo(DEFAULT_ANO_COSECHA);
        assertThat(testVinoRosado.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testVinoRosado.getMaduracion()).isEqualTo(DEFAULT_MADURACION);
        assertThat(testVinoRosado.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testVinoRosado.getCata()).isEqualTo(DEFAULT_CATA);
        assertThat(testVinoRosado.getPurezaVino()).isEqualTo(DEFAULT_PUREZA_VINO);
        assertThat(testVinoRosado.getPrecioBruto()).isEqualTo(DEFAULT_PRECIO_BRUTO);
        assertThat(testVinoRosado.getTipoUvaTinta()).isEqualTo(DEFAULT_TIPO_UVA_TINTA);
        assertThat(testVinoRosado.getTipoUvaBlanca()).isEqualTo(DEFAULT_TIPO_UVA_BLANCA);
        assertThat(testVinoRosado.getStock()).isEqualTo(DEFAULT_STOCK);
    }

    @Test
    @Transactional
    void createVinoRosadoWithExistingId() throws Exception {
        // Create the VinoRosado with an existing ID
        vinoRosado.setId(1L);

        int databaseSizeBeforeCreate = vinoRosadoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVinoRosadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoRosado)))
            .andExpect(status().isBadRequest());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVinoRosados() throws Exception {
        // Initialize the database
        vinoRosadoRepository.saveAndFlush(vinoRosado);

        // Get all the vinoRosadoList
        restVinoRosadoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vinoRosado.getId().intValue())))
            .andExpect(jsonPath("$.[*].bodega").value(hasItem(DEFAULT_BODEGA)))
            .andExpect(jsonPath("$.[*].denominacionOrigen").value(hasItem(DEFAULT_DENOMINACION_ORIGEN.toString())))
            .andExpect(jsonPath("$.[*].anoCosecha").value(hasItem(DEFAULT_ANO_COSECHA.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].maduracion").value(hasItem(DEFAULT_MADURACION)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].cata").value(hasItem(DEFAULT_CATA)))
            .andExpect(jsonPath("$.[*].purezaVino").value(hasItem(DEFAULT_PUREZA_VINO.doubleValue())))
            .andExpect(jsonPath("$.[*].precioBruto").value(hasItem(DEFAULT_PRECIO_BRUTO.doubleValue())))
            .andExpect(jsonPath("$.[*].tipoUvaTinta").value(hasItem(DEFAULT_TIPO_UVA_TINTA.toString())))
            .andExpect(jsonPath("$.[*].tipoUvaBlanca").value(hasItem(DEFAULT_TIPO_UVA_BLANCA.toString())))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)));
    }

    @Test
    @Transactional
    void getVinoRosado() throws Exception {
        // Initialize the database
        vinoRosadoRepository.saveAndFlush(vinoRosado);

        // Get the vinoRosado
        restVinoRosadoMockMvc
            .perform(get(ENTITY_API_URL_ID, vinoRosado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vinoRosado.getId().intValue()))
            .andExpect(jsonPath("$.bodega").value(DEFAULT_BODEGA))
            .andExpect(jsonPath("$.denominacionOrigen").value(DEFAULT_DENOMINACION_ORIGEN.toString()))
            .andExpect(jsonPath("$.anoCosecha").value(DEFAULT_ANO_COSECHA.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.maduracion").value(DEFAULT_MADURACION))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.cata").value(DEFAULT_CATA))
            .andExpect(jsonPath("$.purezaVino").value(DEFAULT_PUREZA_VINO.doubleValue()))
            .andExpect(jsonPath("$.precioBruto").value(DEFAULT_PRECIO_BRUTO.doubleValue()))
            .andExpect(jsonPath("$.tipoUvaTinta").value(DEFAULT_TIPO_UVA_TINTA.toString()))
            .andExpect(jsonPath("$.tipoUvaBlanca").value(DEFAULT_TIPO_UVA_BLANCA.toString()))
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK));
    }

    @Test
    @Transactional
    void getNonExistingVinoRosado() throws Exception {
        // Get the vinoRosado
        restVinoRosadoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewVinoRosado() throws Exception {
        // Initialize the database
        vinoRosadoRepository.saveAndFlush(vinoRosado);

        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();

        // Update the vinoRosado
        VinoRosado updatedVinoRosado = vinoRosadoRepository.findById(vinoRosado.getId()).get();
        // Disconnect from session so that the updates on updatedVinoRosado are not directly saved in db
        em.detach(updatedVinoRosado);
        updatedVinoRosado
            .bodega(UPDATED_BODEGA)
            .denominacionOrigen(UPDATED_DENOMINACION_ORIGEN)
            .anoCosecha(UPDATED_ANO_COSECHA)
            .nombre(UPDATED_NOMBRE)
            .maduracion(UPDATED_MADURACION)
            .descripcion(UPDATED_DESCRIPCION)
            .cata(UPDATED_CATA)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO)
            .tipoUvaTinta(UPDATED_TIPO_UVA_TINTA)
            .tipoUvaBlanca(UPDATED_TIPO_UVA_BLANCA)
            .stock(UPDATED_STOCK);

        restVinoRosadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVinoRosado.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVinoRosado))
            )
            .andExpect(status().isOk());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
        VinoRosado testVinoRosado = vinoRosadoList.get(vinoRosadoList.size() - 1);
        assertThat(testVinoRosado.getBodega()).isEqualTo(UPDATED_BODEGA);
        assertThat(testVinoRosado.getDenominacionOrigen()).isEqualTo(UPDATED_DENOMINACION_ORIGEN);
        assertThat(testVinoRosado.getAnoCosecha()).isEqualTo(UPDATED_ANO_COSECHA);
        assertThat(testVinoRosado.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoRosado.getMaduracion()).isEqualTo(UPDATED_MADURACION);
        assertThat(testVinoRosado.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testVinoRosado.getCata()).isEqualTo(UPDATED_CATA);
        assertThat(testVinoRosado.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoRosado.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoRosado.getTipoUvaTinta()).isEqualTo(UPDATED_TIPO_UVA_TINTA);
        assertThat(testVinoRosado.getTipoUvaBlanca()).isEqualTo(UPDATED_TIPO_UVA_BLANCA);
        assertThat(testVinoRosado.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    void putNonExistingVinoRosado() throws Exception {
        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();
        vinoRosado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVinoRosadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, vinoRosado.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(vinoRosado))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVinoRosado() throws Exception {
        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();
        vinoRosado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoRosadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(vinoRosado))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVinoRosado() throws Exception {
        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();
        vinoRosado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoRosadoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoRosado)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVinoRosadoWithPatch() throws Exception {
        // Initialize the database
        vinoRosadoRepository.saveAndFlush(vinoRosado);

        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();

        // Update the vinoRosado using partial update
        VinoRosado partialUpdatedVinoRosado = new VinoRosado();
        partialUpdatedVinoRosado.setId(vinoRosado.getId());

        partialUpdatedVinoRosado
            .bodega(UPDATED_BODEGA)
            .denominacionOrigen(UPDATED_DENOMINACION_ORIGEN)
            .nombre(UPDATED_NOMBRE)
            .cata(UPDATED_CATA)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO)
            .stock(UPDATED_STOCK);

        restVinoRosadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVinoRosado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVinoRosado))
            )
            .andExpect(status().isOk());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
        VinoRosado testVinoRosado = vinoRosadoList.get(vinoRosadoList.size() - 1);
        assertThat(testVinoRosado.getBodega()).isEqualTo(UPDATED_BODEGA);
        assertThat(testVinoRosado.getDenominacionOrigen()).isEqualTo(UPDATED_DENOMINACION_ORIGEN);
        assertThat(testVinoRosado.getAnoCosecha()).isEqualTo(DEFAULT_ANO_COSECHA);
        assertThat(testVinoRosado.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoRosado.getMaduracion()).isEqualTo(DEFAULT_MADURACION);
        assertThat(testVinoRosado.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testVinoRosado.getCata()).isEqualTo(UPDATED_CATA);
        assertThat(testVinoRosado.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoRosado.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoRosado.getTipoUvaTinta()).isEqualTo(DEFAULT_TIPO_UVA_TINTA);
        assertThat(testVinoRosado.getTipoUvaBlanca()).isEqualTo(DEFAULT_TIPO_UVA_BLANCA);
        assertThat(testVinoRosado.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    void fullUpdateVinoRosadoWithPatch() throws Exception {
        // Initialize the database
        vinoRosadoRepository.saveAndFlush(vinoRosado);

        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();

        // Update the vinoRosado using partial update
        VinoRosado partialUpdatedVinoRosado = new VinoRosado();
        partialUpdatedVinoRosado.setId(vinoRosado.getId());

        partialUpdatedVinoRosado
            .bodega(UPDATED_BODEGA)
            .denominacionOrigen(UPDATED_DENOMINACION_ORIGEN)
            .anoCosecha(UPDATED_ANO_COSECHA)
            .nombre(UPDATED_NOMBRE)
            .maduracion(UPDATED_MADURACION)
            .descripcion(UPDATED_DESCRIPCION)
            .cata(UPDATED_CATA)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO)
            .tipoUvaTinta(UPDATED_TIPO_UVA_TINTA)
            .tipoUvaBlanca(UPDATED_TIPO_UVA_BLANCA)
            .stock(UPDATED_STOCK);

        restVinoRosadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVinoRosado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVinoRosado))
            )
            .andExpect(status().isOk());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
        VinoRosado testVinoRosado = vinoRosadoList.get(vinoRosadoList.size() - 1);
        assertThat(testVinoRosado.getBodega()).isEqualTo(UPDATED_BODEGA);
        assertThat(testVinoRosado.getDenominacionOrigen()).isEqualTo(UPDATED_DENOMINACION_ORIGEN);
        assertThat(testVinoRosado.getAnoCosecha()).isEqualTo(UPDATED_ANO_COSECHA);
        assertThat(testVinoRosado.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoRosado.getMaduracion()).isEqualTo(UPDATED_MADURACION);
        assertThat(testVinoRosado.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testVinoRosado.getCata()).isEqualTo(UPDATED_CATA);
        assertThat(testVinoRosado.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoRosado.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoRosado.getTipoUvaTinta()).isEqualTo(UPDATED_TIPO_UVA_TINTA);
        assertThat(testVinoRosado.getTipoUvaBlanca()).isEqualTo(UPDATED_TIPO_UVA_BLANCA);
        assertThat(testVinoRosado.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    void patchNonExistingVinoRosado() throws Exception {
        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();
        vinoRosado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVinoRosadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, vinoRosado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(vinoRosado))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVinoRosado() throws Exception {
        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();
        vinoRosado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoRosadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(vinoRosado))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVinoRosado() throws Exception {
        int databaseSizeBeforeUpdate = vinoRosadoRepository.findAll().size();
        vinoRosado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoRosadoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(vinoRosado))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VinoRosado in the database
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVinoRosado() throws Exception {
        // Initialize the database
        vinoRosadoRepository.saveAndFlush(vinoRosado);

        int databaseSizeBeforeDelete = vinoRosadoRepository.findAll().size();

        // Delete the vinoRosado
        restVinoRosadoMockMvc
            .perform(delete(ENTITY_API_URL_ID, vinoRosado.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VinoRosado> vinoRosadoList = vinoRosadoRepository.findAll();
        assertThat(vinoRosadoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
