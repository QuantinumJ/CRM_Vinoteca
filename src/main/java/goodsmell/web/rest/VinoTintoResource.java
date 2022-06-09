package goodsmell.web.rest;

import goodsmell.domain.VinoTinto;
import goodsmell.repository.VinoTintoRepository;
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
 * REST controller for managing {@link goodsmell.domain.VinoTinto}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VinoTintoResource {

    private final Logger log = LoggerFactory.getLogger(VinoTintoResource.class);

    private static final String ENTITY_NAME = "vinoTinto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VinoTintoRepository vinoTintoRepository;

    public VinoTintoResource(VinoTintoRepository vinoTintoRepository) {
        this.vinoTintoRepository = vinoTintoRepository;
    }

    /**
     * {@code POST  /vino-tintos} : Create a new vinoTinto.
     *
     * @param vinoTinto the vinoTinto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vinoTinto, or with status {@code 400 (Bad Request)} if the vinoTinto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vino-tintos")
    public ResponseEntity<VinoTinto> createVinoTinto(@RequestBody VinoTinto vinoTinto) throws URISyntaxException {
        log.debug("REST request to save VinoTinto : {}", vinoTinto);
        if (vinoTinto.getId() != null) {
            throw new BadRequestAlertException("A new vinoTinto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VinoTinto result = vinoTintoRepository.save(vinoTinto);
        return ResponseEntity
            .created(new URI("/api/vino-tintos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vino-tintos/:id} : Updates an existing vinoTinto.
     *
     * @param id the id of the vinoTinto to save.
     * @param vinoTinto the vinoTinto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vinoTinto,
     * or with status {@code 400 (Bad Request)} if the vinoTinto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vinoTinto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vino-tintos/{id}")
    public ResponseEntity<VinoTinto> updateVinoTinto(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VinoTinto vinoTinto
    ) throws URISyntaxException {
        log.debug("REST request to update VinoTinto : {}, {}", id, vinoTinto);
        if (vinoTinto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vinoTinto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vinoTintoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VinoTinto result = vinoTintoRepository.save(vinoTinto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vinoTinto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /vino-tintos/:id} : Partial updates given fields of an existing vinoTinto, field will ignore if it is null
     *
     * @param id the id of the vinoTinto to save.
     * @param vinoTinto the vinoTinto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vinoTinto,
     * or with status {@code 400 (Bad Request)} if the vinoTinto is not valid,
     * or with status {@code 404 (Not Found)} if the vinoTinto is not found,
     * or with status {@code 500 (Internal Server Error)} if the vinoTinto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/vino-tintos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VinoTinto> partialUpdateVinoTinto(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VinoTinto vinoTinto
    ) throws URISyntaxException {
        log.debug("REST request to partial update VinoTinto partially : {}, {}", id, vinoTinto);
        if (vinoTinto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vinoTinto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vinoTintoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VinoTinto> result = vinoTintoRepository
            .findById(vinoTinto.getId())
            .map(existingVinoTinto -> {
                if (vinoTinto.getBodega() != null) {
                    existingVinoTinto.setBodega(vinoTinto.getBodega());
                }
                if (vinoTinto.getDenominacionOrigen() != null) {
                    existingVinoTinto.setDenominacionOrigen(vinoTinto.getDenominacionOrigen());
                }
                if (vinoTinto.getAnoCosecha() != null) {
                    existingVinoTinto.setAnoCosecha(vinoTinto.getAnoCosecha());
                }
                if (vinoTinto.getNombre() != null) {
                    existingVinoTinto.setNombre(vinoTinto.getNombre());
                }
                if (vinoTinto.getMaduracion() != null) {
                    existingVinoTinto.setMaduracion(vinoTinto.getMaduracion());
                }
                if (vinoTinto.getDescripcion() != null) {
                    existingVinoTinto.setDescripcion(vinoTinto.getDescripcion());
                }
                if (vinoTinto.getCata() != null) {
                    existingVinoTinto.setCata(vinoTinto.getCata());
                }
                if (vinoTinto.getPurezaVino() != null) {
                    existingVinoTinto.setPurezaVino(vinoTinto.getPurezaVino());
                }
                if (vinoTinto.getPrecioBruto() != null) {
                    existingVinoTinto.setPrecioBruto(vinoTinto.getPrecioBruto());
                }
                if (vinoTinto.getTipoUvaTinta() != null) {
                    existingVinoTinto.setTipoUvaTinta(vinoTinto.getTipoUvaTinta());
                }
                if (vinoTinto.getStock() != null) {
                    existingVinoTinto.setStock(vinoTinto.getStock());
                }

                return existingVinoTinto;
            })
            .map(vinoTintoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vinoTinto.getId().toString())
        );
    }

    /**
     * {@code GET  /vino-tintos} : get all the vinoTintos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vinoTintos in body.
     */
    @GetMapping("/vino-tintos")
    public List<VinoTinto> getAllVinoTintos() {
        log.debug("REST request to get all VinoTintos");
        return vinoTintoRepository.findAll();
    }

    /**
     * {@code GET  /vino-tintos/:id} : get the "id" vinoTinto.
     *
     * @param id the id of the vinoTinto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vinoTinto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vino-tintos/{id}")
    public ResponseEntity<VinoTinto> getVinoTinto(@PathVariable Long id) {
        log.debug("REST request to get VinoTinto : {}", id);
        Optional<VinoTinto> vinoTinto = vinoTintoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vinoTinto);
    }

    /**
     * {@code DELETE  /vino-tintos/:id} : delete the "id" vinoTinto.
     *
     * @param id the id of the vinoTinto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vino-tintos/{id}")
    public ResponseEntity<Void> deleteVinoTinto(@PathVariable Long id) {
        log.debug("REST request to delete VinoTinto : {}", id);
        vinoTintoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
