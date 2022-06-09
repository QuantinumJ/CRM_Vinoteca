package goodsmell.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import goodsmell.IntegrationTest;
import goodsmell.domain.VinoBlanco;
import goodsmell.domain.enumeration.DomOrg;
import goodsmell.domain.enumeration.UvaBlanca;
import goodsmell.repository.VinoBlancoRepository;
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
 * Integration tests for the {@link VinoBlancoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VinoBlancoResourceIT {

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

    private static final UvaBlanca DEFAULT_TIPO_UVA_BLANCA = UvaBlanca.VERDEJO;
    private static final UvaBlanca UPDATED_TIPO_UVA_BLANCA = UvaBlanca.ALBARINO;

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;

    private static final String ENTITY_API_URL = "/api/vino-blancos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VinoBlancoRepository vinoBlancoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVinoBlancoMockMvc;

    private VinoBlanco vinoBlanco;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VinoBlanco createEntity(EntityManager em) {
        VinoBlanco vinoBlanco = new VinoBlanco()
            .bodega(DEFAULT_BODEGA)
            .denominacionOrigen(DEFAULT_DENOMINACION_ORIGEN)
            .anoCosecha(DEFAULT_ANO_COSECHA)
            .nombre(DEFAULT_NOMBRE)
            .maduracion(DEFAULT_MADURACION)
            .descripcion(DEFAULT_DESCRIPCION)
            .cata(DEFAULT_CATA)
            .purezaVino(DEFAULT_PUREZA_VINO)
            .precioBruto(DEFAULT_PRECIO_BRUTO)
            .tipoUvaBlanca(DEFAULT_TIPO_UVA_BLANCA)
            .stock(DEFAULT_STOCK);
        return vinoBlanco;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VinoBlanco createUpdatedEntity(EntityManager em) {
        VinoBlanco vinoBlanco = new VinoBlanco()
            .bodega(UPDATED_BODEGA)
            .denominacionOrigen(UPDATED_DENOMINACION_ORIGEN)
            .anoCosecha(UPDATED_ANO_COSECHA)
            .nombre(UPDATED_NOMBRE)
            .maduracion(UPDATED_MADURACION)
            .descripcion(UPDATED_DESCRIPCION)
            .cata(UPDATED_CATA)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO)
            .tipoUvaBlanca(UPDATED_TIPO_UVA_BLANCA)
            .stock(UPDATED_STOCK);
        return vinoBlanco;
    }

    @BeforeEach
    public void initTest() {
        vinoBlanco = createEntity(em);
    }

    @Test
    @Transactional
    void createVinoBlanco() throws Exception {
        int databaseSizeBeforeCreate = vinoBlancoRepository.findAll().size();
        // Create the VinoBlanco
        restVinoBlancoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoBlanco)))
            .andExpect(status().isCreated());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeCreate + 1);
        VinoBlanco testVinoBlanco = vinoBlancoList.get(vinoBlancoList.size() - 1);
        assertThat(testVinoBlanco.getBodega()).isEqualTo(DEFAULT_BODEGA);
        assertThat(testVinoBlanco.getDenominacionOrigen()).isEqualTo(DEFAULT_DENOMINACION_ORIGEN);
        assertThat(testVinoBlanco.getAnoCosecha()).isEqualTo(DEFAULT_ANO_COSECHA);
        assertThat(testVinoBlanco.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testVinoBlanco.getMaduracion()).isEqualTo(DEFAULT_MADURACION);
        assertThat(testVinoBlanco.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testVinoBlanco.getCata()).isEqualTo(DEFAULT_CATA);
        assertThat(testVinoBlanco.getPurezaVino()).isEqualTo(DEFAULT_PUREZA_VINO);
        assertThat(testVinoBlanco.getPrecioBruto()).isEqualTo(DEFAULT_PRECIO_BRUTO);
        assertThat(testVinoBlanco.getTipoUvaBlanca()).isEqualTo(DEFAULT_TIPO_UVA_BLANCA);
        assertThat(testVinoBlanco.getStock()).isEqualTo(DEFAULT_STOCK);
    }

    @Test
    @Transactional
    void createVinoBlancoWithExistingId() throws Exception {
        // Create the VinoBlanco with an existing ID
        vinoBlanco.setId(1L);

        int databaseSizeBeforeCreate = vinoBlancoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVinoBlancoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoBlanco)))
            .andExpect(status().isBadRequest());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVinoBlancos() throws Exception {
        // Initialize the database
        vinoBlancoRepository.saveAndFlush(vinoBlanco);

        // Get all the vinoBlancoList
        restVinoBlancoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vinoBlanco.getId().intValue())))
            .andExpect(jsonPath("$.[*].bodega").value(hasItem(DEFAULT_BODEGA)))
            .andExpect(jsonPath("$.[*].denominacionOrigen").value(hasItem(DEFAULT_DENOMINACION_ORIGEN.toString())))
            .andExpect(jsonPath("$.[*].anoCosecha").value(hasItem(DEFAULT_ANO_COSECHA.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].maduracion").value(hasItem(DEFAULT_MADURACION)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].cata").value(hasItem(DEFAULT_CATA)))
            .andExpect(jsonPath("$.[*].purezaVino").value(hasItem(DEFAULT_PUREZA_VINO.doubleValue())))
            .andExpect(jsonPath("$.[*].precioBruto").value(hasItem(DEFAULT_PRECIO_BRUTO.doubleValue())))
            .andExpect(jsonPath("$.[*].tipoUvaBlanca").value(hasItem(DEFAULT_TIPO_UVA_BLANCA.toString())))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)));
    }

    @Test
    @Transactional
    void getVinoBlanco() throws Exception {
        // Initialize the database
        vinoBlancoRepository.saveAndFlush(vinoBlanco);

        // Get the vinoBlanco
        restVinoBlancoMockMvc
            .perform(get(ENTITY_API_URL_ID, vinoBlanco.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vinoBlanco.getId().intValue()))
            .andExpect(jsonPath("$.bodega").value(DEFAULT_BODEGA))
            .andExpect(jsonPath("$.denominacionOrigen").value(DEFAULT_DENOMINACION_ORIGEN.toString()))
            .andExpect(jsonPath("$.anoCosecha").value(DEFAULT_ANO_COSECHA.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.maduracion").value(DEFAULT_MADURACION))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.cata").value(DEFAULT_CATA))
            .andExpect(jsonPath("$.purezaVino").value(DEFAULT_PUREZA_VINO.doubleValue()))
            .andExpect(jsonPath("$.precioBruto").value(DEFAULT_PRECIO_BRUTO.doubleValue()))
            .andExpect(jsonPath("$.tipoUvaBlanca").value(DEFAULT_TIPO_UVA_BLANCA.toString()))
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK));
    }

    @Test
    @Transactional
    void getNonExistingVinoBlanco() throws Exception {
        // Get the vinoBlanco
        restVinoBlancoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewVinoBlanco() throws Exception {
        // Initialize the database
        vinoBlancoRepository.saveAndFlush(vinoBlanco);

        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();

        // Update the vinoBlanco
        VinoBlanco updatedVinoBlanco = vinoBlancoRepository.findById(vinoBlanco.getId()).get();
        // Disconnect from session so that the updates on updatedVinoBlanco are not directly saved in db
        em.detach(updatedVinoBlanco);
        updatedVinoBlanco
            .bodega(UPDATED_BODEGA)
            .denominacionOrigen(UPDATED_DENOMINACION_ORIGEN)
            .anoCosecha(UPDATED_ANO_COSECHA)
            .nombre(UPDATED_NOMBRE)
            .maduracion(UPDATED_MADURACION)
            .descripcion(UPDATED_DESCRIPCION)
            .cata(UPDATED_CATA)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO)
            .tipoUvaBlanca(UPDATED_TIPO_UVA_BLANCA)
            .stock(UPDATED_STOCK);

        restVinoBlancoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVinoBlanco.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVinoBlanco))
            )
            .andExpect(status().isOk());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
        VinoBlanco testVinoBlanco = vinoBlancoList.get(vinoBlancoList.size() - 1);
        assertThat(testVinoBlanco.getBodega()).isEqualTo(UPDATED_BODEGA);
        assertThat(testVinoBlanco.getDenominacionOrigen()).isEqualTo(UPDATED_DENOMINACION_ORIGEN);
        assertThat(testVinoBlanco.getAnoCosecha()).isEqualTo(UPDATED_ANO_COSECHA);
        assertThat(testVinoBlanco.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoBlanco.getMaduracion()).isEqualTo(UPDATED_MADURACION);
        assertThat(testVinoBlanco.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testVinoBlanco.getCata()).isEqualTo(UPDATED_CATA);
        assertThat(testVinoBlanco.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoBlanco.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoBlanco.getTipoUvaBlanca()).isEqualTo(UPDATED_TIPO_UVA_BLANCA);
        assertThat(testVinoBlanco.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    void putNonExistingVinoBlanco() throws Exception {
        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();
        vinoBlanco.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVinoBlancoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, vinoBlanco.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(vinoBlanco))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVinoBlanco() throws Exception {
        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();
        vinoBlanco.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoBlancoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(vinoBlanco))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVinoBlanco() throws Exception {
        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();
        vinoBlanco.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoBlancoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vinoBlanco)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVinoBlancoWithPatch() throws Exception {
        // Initialize the database
        vinoBlancoRepository.saveAndFlush(vinoBlanco);

        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();

        // Update the vinoBlanco using partial update
        VinoBlanco partialUpdatedVinoBlanco = new VinoBlanco();
        partialUpdatedVinoBlanco.setId(vinoBlanco.getId());

        partialUpdatedVinoBlanco
            .anoCosecha(UPDATED_ANO_COSECHA)
            .nombre(UPDATED_NOMBRE)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO);

        restVinoBlancoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVinoBlanco.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVinoBlanco))
            )
            .andExpect(status().isOk());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
        VinoBlanco testVinoBlanco = vinoBlancoList.get(vinoBlancoList.size() - 1);
        assertThat(testVinoBlanco.getBodega()).isEqualTo(DEFAULT_BODEGA);
        assertThat(testVinoBlanco.getDenominacionOrigen()).isEqualTo(DEFAULT_DENOMINACION_ORIGEN);
        assertThat(testVinoBlanco.getAnoCosecha()).isEqualTo(UPDATED_ANO_COSECHA);
        assertThat(testVinoBlanco.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoBlanco.getMaduracion()).isEqualTo(DEFAULT_MADURACION);
        assertThat(testVinoBlanco.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testVinoBlanco.getCata()).isEqualTo(DEFAULT_CATA);
        assertThat(testVinoBlanco.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoBlanco.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoBlanco.getTipoUvaBlanca()).isEqualTo(DEFAULT_TIPO_UVA_BLANCA);
        assertThat(testVinoBlanco.getStock()).isEqualTo(DEFAULT_STOCK);
    }

    @Test
    @Transactional
    void fullUpdateVinoBlancoWithPatch() throws Exception {
        // Initialize the database
        vinoBlancoRepository.saveAndFlush(vinoBlanco);

        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();

        // Update the vinoBlanco using partial update
        VinoBlanco partialUpdatedVinoBlanco = new VinoBlanco();
        partialUpdatedVinoBlanco.setId(vinoBlanco.getId());

        partialUpdatedVinoBlanco
            .bodega(UPDATED_BODEGA)
            .denominacionOrigen(UPDATED_DENOMINACION_ORIGEN)
            .anoCosecha(UPDATED_ANO_COSECHA)
            .nombre(UPDATED_NOMBRE)
            .maduracion(UPDATED_MADURACION)
            .descripcion(UPDATED_DESCRIPCION)
            .cata(UPDATED_CATA)
            .purezaVino(UPDATED_PUREZA_VINO)
            .precioBruto(UPDATED_PRECIO_BRUTO)
            .tipoUvaBlanca(UPDATED_TIPO_UVA_BLANCA)
            .stock(UPDATED_STOCK);

        restVinoBlancoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVinoBlanco.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVinoBlanco))
            )
            .andExpect(status().isOk());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
        VinoBlanco testVinoBlanco = vinoBlancoList.get(vinoBlancoList.size() - 1);
        assertThat(testVinoBlanco.getBodega()).isEqualTo(UPDATED_BODEGA);
        assertThat(testVinoBlanco.getDenominacionOrigen()).isEqualTo(UPDATED_DENOMINACION_ORIGEN);
        assertThat(testVinoBlanco.getAnoCosecha()).isEqualTo(UPDATED_ANO_COSECHA);
        assertThat(testVinoBlanco.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVinoBlanco.getMaduracion()).isEqualTo(UPDATED_MADURACION);
        assertThat(testVinoBlanco.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testVinoBlanco.getCata()).isEqualTo(UPDATED_CATA);
        assertThat(testVinoBlanco.getPurezaVino()).isEqualTo(UPDATED_PUREZA_VINO);
        assertThat(testVinoBlanco.getPrecioBruto()).isEqualTo(UPDATED_PRECIO_BRUTO);
        assertThat(testVinoBlanco.getTipoUvaBlanca()).isEqualTo(UPDATED_TIPO_UVA_BLANCA);
        assertThat(testVinoBlanco.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    void patchNonExistingVinoBlanco() throws Exception {
        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();
        vinoBlanco.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVinoBlancoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, vinoBlanco.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(vinoBlanco))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVinoBlanco() throws Exception {
        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();
        vinoBlanco.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoBlancoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(vinoBlanco))
            )
            .andExpect(status().isBadRequest());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVinoBlanco() throws Exception {
        int databaseSizeBeforeUpdate = vinoBlancoRepository.findAll().size();
        vinoBlanco.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVinoBlancoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(vinoBlanco))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VinoBlanco in the database
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVinoBlanco() throws Exception {
        // Initialize the database
        vinoBlancoRepository.saveAndFlush(vinoBlanco);

        int databaseSizeBeforeDelete = vinoBlancoRepository.findAll().size();

        // Delete the vinoBlanco
        restVinoBlancoMockMvc
            .perform(delete(ENTITY_API_URL_ID, vinoBlanco.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VinoBlanco> vinoBlancoList = vinoBlancoRepository.findAll();
        assertThat(vinoBlancoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
