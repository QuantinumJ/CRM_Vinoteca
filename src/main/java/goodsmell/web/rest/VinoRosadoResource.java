package goodsmell.web.rest;

import goodsmell.domain.VinoRosado;
import goodsmell.repository.VinoRosadoRepository;
import goodsmell.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link goodsmell.domain.VinoRosado}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VinoRosadoResource {

    private final Logger log = LoggerFactory.getLogger(VinoRosadoResource.class);

    private static final String ENTITY_NAME = "vinoRosado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VinoRosadoRepository vinoRosadoRepository;

    public VinoRosadoResource(VinoRosadoRepository vinoRosadoRepository) {
        this.vinoRosadoRepository = vinoRosadoRepository;
    }

    /**
     * {@code POST  /vino-rosados} : Create a new vinoRosado.
     *
     * @param vinoRosado the vinoRosado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vinoRosado, or with status {@code 400 (Bad Request)} if the vinoRosado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vino-rosados")
    public ResponseEntity<VinoRosado> createVinoRosado(@RequestBody VinoRosado vinoRosado) throws URISyntaxException {
        log.debug("REST request to save VinoRosado : {}", vinoRosado);
        if (vinoRosado.getId() != null) {
            throw new BadRequestAlertException("A new vinoRosado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VinoRosado result = vinoRosadoRepository.save(vinoRosado);
        return ResponseEntity
            .created(new URI("/api/vino-rosados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vino-rosados/:id} : Updates an existing vinoRosado.
     *
     * @param id the id of the vinoRosado to save.
     * @param vinoRosado the vinoRosado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vinoRosado,
     * or with status {@code 400 (Bad Request)} if the vinoRosado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vinoRosado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vino-rosados/{id}")
    public ResponseEntity<VinoRosado> updateVinoRosado(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VinoRosado vinoRosado
    ) throws URISyntaxException {
        log.debug("REST request to update VinoRosado : {}, {}", id, vinoRosado);
        if (vinoRosado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vinoRosado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vinoRosadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VinoRosado result = vinoRosadoRepository.save(vinoRosado);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vinoRosado.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /vino-rosados/:id} : Partial updates given fields of an existing vinoRosado, field will ignore if it is null
     *
     * @param id the id of the vinoRosado to save.
     * @param vinoRosado the vinoRosado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vinoRosado,
     * or with status {@code 400 (Bad Request)} if the vinoRosado is not valid,
     * or with status {@code 404 (Not Found)} if the vinoRosado is not found,
     * or with status {@code 500 (Internal Server Error)} if the vinoRosado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/vino-rosados/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VinoRosado> partialUpdateVinoRosado(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VinoRosado vinoRosado
    ) throws URISyntaxException {
        log.debug("REST request to partial update VinoRosado partially : {}, {}", id, vinoRosado);
        if (vinoRosado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vinoRosado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vinoRosadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VinoRosado> result = vinoRosadoRepository
            .findById(vinoRosado.getId())
            .map(existingVinoRosado -> {
                if (vinoRosado.getBodega() != null) {
                    existingVinoRosado.setBodega(vinoRosado.getBodega());
                }
                if (vinoRosado.getDenominacionOrigen() != null) {
                    existingVinoRosado.setDenominacionOrigen(vinoRosado.getDenominacionOrigen());
                }
                if (vinoRosado.getAnoCosecha() != null) {
                    existingVinoRosado.setAnoCosecha(vinoRosado.getAnoCosecha());
                }
                if (vinoRosado.getNombre() != null) {
                    existingVinoRosado.setNombre(vinoRosado.getNombre());
                }
                if (vinoRosado.getMaduracion() != null) {
                    existingVinoRosado.setMaduracion(vinoRosado.getMaduracion());
                }
                if (vinoRosado.getDescripcion() != null) {
                    existingVinoRosado.setDescripcion(vinoRosado.getDescripcion());
                }
                if (vinoRosado.getCata() != null) {
                    existingVinoRosado.setCata(vinoRosado.getCata());
                }
                if (vinoRosado.getPurezaVino() != null) {
                    existingVinoRosado.setPurezaVino(vinoRosado.getPurezaVino());
                }
                if (vinoRosado.getPrecioBruto() != null) {
                    existingVinoRosado.setPrecioBruto(vinoRosado.getPrecioBruto());
                }
                if (vinoRosado.getTipoUvaTinta() != null) {
                    existingVinoRosado.setTipoUvaTinta(vinoRosado.getTipoUvaTinta());
                }
                if (vinoRosado.getTipoUvaBlanca() != null) {
                    existingVinoRosado.setTipoUvaBlanca(vinoRosado.getTipoUvaBlanca());
                }
                if (vinoRosado.getStock() != null) {
                    existingVinoRosado.setStock(vinoRosado.getStock());
                }

                return existingVinoRosado;
            })
            .map(vinoRosadoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vinoRosado.getId().toString())
        );
    }

    /**
     * {@code GET  /vino-rosados} : get all the vinoRosados.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vinoRosados in body.
     */
    @GetMapping("/vino-rosados")
    public List<VinoRosado> getAllVinoRosados() {
        log.debug("REST request to get all VinoRosados");
        return vinoRosadoRepository.findAll();
    }

    /**
     * {@code GET  /vino-rosados/:id} : get the "id" vinoRosado.
     *
     * @param id the id of the vinoRosado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vinoRosado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vino-rosados/{id}")
    public ResponseEntity<VinoRosado> getVinoRosado(@PathVariable Long id) {
        log.debug("REST request to get VinoRosado : {}", id);
        Optional<VinoRosado> vinoRosado = vinoRosadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vinoRosado);
    }

    /**
     * {@code DELETE  /vino-rosados/:id} : delete the "id" vinoRosado.
     *
     * @param id the id of the vinoRosado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vino-rosados/{id}")
    public ResponseEntity<Void> deleteVinoRosado(@PathVariable Long id) {
        log.debug("REST request to delete VinoRosado : {}", id);
        vinoRosadoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
