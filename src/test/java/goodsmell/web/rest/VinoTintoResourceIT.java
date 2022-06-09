package goodsmell.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import goodsmell.IntegrationTest;
import goodsmell.domain.VinoTinto;
import goodsmell.domain.enumeration.DomOrg;
import goodsmell.domain.enumeration.UvaTinta;
import goodsmell.repository.VinoTintoRepository;
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
 * Integration tests for the {@link VinoTintoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VinoTintoResourceIT {

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

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;

    private static final String ENTITY_API_URL = "/api/vino-tintos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VinoTintoRepository vinoTintoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVinoTintoMockMvc;

    private VinoTinto vinoTinto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VinoTinto createEntity(EntityManager em) {
        VinoTinto vinoTinto = new VinoTinto()
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
            .stock(DEFAULT_STOCK);
        return vinoTinto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VinoTinto createUpdatedEntity(EntityManager em) {
        VinoTinto vinoTinto = new VinoTinto()
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
            .stock(UPDATED_STOCK);
        return vinoTinto;
    }

    @BeforeEach
    public void initTest() {
        vinoTinto = createEntity(em);
    }

    @Test
    @Transactional
    void createVinoTinto() throws Exception {
        int databaseSizeBeforeCreate = vinoTintoRepository.findAll().size();
        // Create the VinoTinto
        restVinoTintoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoTinto)))
            .andExpect(status().isCreated());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeCreate + 1);
        VinoTinto testVinoTinto = vinoTintoList.get(vinoTintoList.size() - 1);
        assertThat(testVinoTinto.getBodega()).isEqualTo(DEFAULT_BODEGA);
        assertThat(testVinoTinto.getDenominacionOrigen()).isEqualTo(DEFAULT_DENOMINACION_ORIGEN);
        assertThat(testVinoTinto.getAnoCosecha()).isEqualTo(DEFAULT_ANO_COSECHA);
        assertThat(testVinoTinto.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testVinoTinto.getMaduracion()).isEqualTo(DEFAULT_MADURACION);
        assertThat(testVinoTinto.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testVinoTinto.getCata()).isEqualTo(DEFAULT_CATA);
        assertThat(testVinoTinto.getPurezaVino()).isEqualTo(DEFAULT_PUREZA_VINO);
        assertThat(testVinoTinto.getPrecioBruto()).isEqualTo(DEFAULT_PRECIO_BRUTO);
        assertThat(testVinoTinto.getTipoUvaTinta()).isEqualTo(DEFAULT_TIPO_UVA_TINTA);
        assertThat(testVinoTinto.getStock()).isEqualTo(DEFAULT_STOCK);
    }

    @Test
    @Transactional
    void createVinoTintoWithExistingId() throws Exception {
        // Create the VinoTinto with an existing ID
        vinoTinto.setId(1L);

        int databaseSizeBeforeCreate = vinoTintoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVinoTintoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoTinto)))
            .andExpect(status().isBadRequest());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVinoTintos() throws Exception {
        // Initialize the database
        vinoTintoRepository.saveAndFlush(vinoTinto);

        // Get all the vinoTintoList
        restVinoTintoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vinoTinto.getId().intValue())))
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
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)));
    }

    @Test
    @Transactional
    void getVinoTinto() throws Exception {
        // Initialize the database
        vinoTintoRepository.saveAndFlush(vinoTinto);

        // Get the vinoTinto
        restVinoTintoMockMvc
            .perform(get(ENTITY_API_URL_ID, vinoTinto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vinoTinto.getId().intValue()))
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
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK));
    }

    @Test
    @Transactional
    void getNonExistingVinoTinto() throws Exception {
        // Get the vinoTinto
        restVinoTintoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewVinoTinto() throws Exception {
        // Initialize the database
        vinoTintoRepository.saveAndFlush(vinoTinto);

        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();

        // Update the vinoTinto
        VinoTinto updatedVinoTinto = vinoTintoRepository.findById(vinoTinto.getId()).get();
        // Disconnect from session so that the updates on updatedVinoTinto are not directly saved in db
        em.detach(updatedVinoTinto);
        updatedVinoTinto
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
            .stock(UPDATED_STOCK);

        restVinoTintoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVinoTinto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVinoTinto))
            )
            .andExpect(status().isOk());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
        VinoTinto testVinoTinto = vinoTintoList.get(vinoTintoList.size() - 1);
        assertThat(testVinoTinto.getBodega()).isEqualTo(UPDATED_BODEGA);
        assertThat(testVinoTinto.getDenominacionOrigen()).isEqualTo(UPDATED_DENOMINACION_ORIGEN);
        assertThat(testVinoTinto.getAnoCosecha()).isEqualTo(UPDATED_ANO_COSECHA);
        assertThat(testVinoTinto.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoTinto.getMaduracion()).isEqualTo(UPDATED_MADURACION);
        assertThat(testVinoTinto.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testVinoTinto.getCata()).isEqualTo(UPDATED_CATA);
        assertThat(testVinoTinto.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoTinto.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoTinto.getTipoUvaTinta()).isEqualTo(UPDATED_TIPO_UVA_TINTA);
        assertThat(testVinoTinto.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    void putNonExistingVinoTinto() throws Exception {
        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();
        vinoTinto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVinoTintoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, vinoTinto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(vinoTinto))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVinoTinto() throws Exception {
        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();
        vinoTinto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoTintoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(vinoTinto))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVinoTinto() throws Exception {
        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();
        vinoTinto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoTintoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoTinto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVinoTintoWithPatch() throws Exception {
        // Initialize the database
        vinoTintoRepository.saveAndFlush(vinoTinto);

        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();

        // Update the vinoTinto using partial update
        VinoTinto partialUpdatedVinoTinto = new VinoTinto();
        partialUpdatedVinoTinto.setId(vinoTinto.getId());

        partialUpdatedVinoTinto
            .bodega(UPDATED_BODEGA)
            .anoCosecha(UPDATED_ANO_COSECHA)
            .nombre(UPDATED_NOMBRE)
            .maduracion(UPDATED_MADURACION)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO)
            .tipoUvaTinta(UPDATED_TIPO_UVA_TINTA);

        restVinoTintoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVinoTinto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVinoTinto))
            )
            .andExpect(status().isOk());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
        VinoTinto testVinoTinto = vinoTintoList.get(vinoTintoList.size() - 1);
        assertThat(testVinoTinto.getBodega()).isEqualTo(UPDATED_BODEGA);
        assertThat(testVinoTinto.getDenominacionOrigen()).isEqualTo(DEFAULT_DENOMINACION_ORIGEN);
        assertThat(testVinoTinto.getAnoCosecha()).isEqualTo(UPDATED_ANO_COSECHA);
        assertThat(testVinoTinto.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoTinto.getMaduracion()).isEqualTo(UPDATED_MADURACION);
        assertThat(testVinoTinto.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testVinoTinto.getCata()).isEqualTo(DEFAULT_CATA);
        assertThat(testVinoTinto.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoTinto.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoTinto.getTipoUvaTinta()).isEqualTo(UPDATED_TIPO_UVA_TINTA);
        assertThat(testVinoTinto.getStock()).isEqualTo(DEFAULT_STOCK);
    }

    @Test
    @Transactional
    void fullUpdateVinoTintoWithPatch() throws Exception {
        // Initialize the database
        vinoTintoRepository.saveAndFlush(vinoTinto);

        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();

        // Update the vinoTinto using partial update
        VinoTinto partialUpdatedVinoTinto = new VinoTinto();
        partialUpdatedVinoTinto.setId(vinoTinto.getId());

        partialUpdatedVinoTinto
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
            .stock(UPDATED_STOCK);

        restVinoTintoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVinoTinto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVinoTinto))
            )
            .andExpect(status().isOk());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
        VinoTinto testVinoTinto = vinoTintoList.get(vinoTintoList.size() - 1);
        assertThat(testVinoTinto.getBodega()).isEqualTo(UPDATED_BODEGA);
        assertThat(testVinoTinto.getDenominacionOrigen()).isEqualTo(UPDATED_DENOMINACION_ORIGEN);
        assertThat(testVinoTinto.getAnoCosecha()).isEqualTo(UPDATED_ANO_COSECHA);
        assertThat(testVinoTinto.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoTinto.getMaduracion()).isEqualTo(UPDATED_MADURACION);
        assertThat(testVinoTinto.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testVinoTinto.getCata()).isEqualTo(UPDATED_CATA);
        assertThat(testVinoTinto.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoTinto.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoTinto.getTipoUvaTinta()).isEqualTo(UPDATED_TIPO_UVA_TINTA);
        assertThat(testVinoTinto.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    void patchNonExistingVinoTinto() throws Exception {
        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();
        vinoTinto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVinoTintoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, vinoTinto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(vinoTinto))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVinoTinto() throws Exception {
        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();
        vinoTinto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoTintoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(vinoTinto))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVinoTinto() throws Exception {
        int databaseSizeBeforeUpdate = vinoTintoRepository.findAll().size();
        vinoTinto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoTintoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(vinoTinto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VinoTinto in the database
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVinoTinto() throws Exception {
        // Initialize the database
        vinoTintoRepository.saveAndFlush(vinoTinto);

        int databaseSizeBeforeDelete = vinoTintoRepository.findAll().size();

        // Delete the vinoTinto
        restVinoTintoMockMvc
            .perform(delete(ENTITY_API_URL_ID, vinoTinto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VinoTinto> vinoTintoList = vinoTintoRepository.findAll();
        assertThat(vinoTintoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
