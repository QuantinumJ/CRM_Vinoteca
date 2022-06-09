package goodsmell.web.rest;

import goodsmell.domain.VinoBlanco;
import goodsmell.repository.VinoBlancoRepository;
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
 * REST controller for managing {@link goodsmell.domain.VinoBlanco}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VinoBlancoResource {

    private final Logger log = LoggerFactory.getLogger(VinoBlancoResource.class);

    private static final String ENTITY_NAME = "vinoBlanco";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VinoBlancoRepository vinoBlancoRepository;

    public VinoBlancoResource(VinoBlancoRepository vinoBlancoRepository) {
        this.vinoBlancoRepository = vinoBlancoRepository;
    }

    /**
     * {@code POST  /vino-blancos} : Create a new vinoBlanco.
     *
     * @param vinoBlanco the vinoBlanco to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vinoBlanco, or with status {@code 400 (Bad Request)} if the vinoBlanco has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vino-blancos")
    public ResponseEntity<VinoBlanco> createVinoBlanco(@RequestBody VinoBlanco vinoBlanco) throws URISyntaxException {
        log.debug("REST request to save VinoBlanco : {}", vinoBlanco);
        if (vinoBlanco.getId() != null) {
            throw new BadRequestAlertException("A new vinoBlanco cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VinoBlanco result = vinoBlancoRepository.save(vinoBlanco);
        return ResponseEntity
            .created(new URI("/api/vino-blancos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vino-blancos/:id} : Updates an existing vinoBlanco.
     *
     * @param id the id of the vinoBlanco to save.
     * @param vinoBlanco the vinoBlanco to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vinoBlanco,
     * or with status {@code 400 (Bad Request)} if the vinoBlanco is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vinoBlanco couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vino-blancos/{id}")
    public ResponseEntity<VinoBlanco> updateVinoBlanco(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VinoBlanco vinoBlanco
    ) throws URISyntaxException {
        log.debug("REST request to update VinoBlanco : {}, {}", id, vinoBlanco);
        if (vinoBlanco.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vinoBlanco.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vinoBlancoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VinoBlanco result = vinoBlancoRepository.save(vinoBlanco);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vinoBlanco.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /vino-blancos/:id} : Partial updates given fields of an existing vinoBlanco, field will ignore if it is null
     *
     * @param id the id of the vinoBlanco to save.
     * @param vinoBlanco the vinoBlanco to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vinoBlanco,
     * or with status {@code 400 (Bad Request)} if the vinoBlanco is not valid,
     * or with status {@code 404 (Not Found)} if the vinoBlanco is not found,
     * or with status {@code 500 (Internal Server Error)} if the vinoBlanco couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/vino-blancos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VinoBlanco> partialUpdateVinoBlanco(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VinoBlanco vinoBlanco
    ) throws URISyntaxException {
        log.debug("REST request to partial update VinoBlanco partially : {}, {}", id, vinoBlanco);
        if (vinoBlanco.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vinoBlanco.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vinoBlancoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VinoBlanco> result = vinoBlancoRepository
            .findById(vinoBlanco.getId())
            .map(existingVinoBlanco -> {
                if (vinoBlanco.getBodega() != null) {
                    existingVinoBlanco.setBodega(vinoBlanco.getBodega());
                }
                if (vinoBlanco.getDenominacionOrigen() != null) {
                    existingVinoBlanco.setDenominacionOrigen(vinoBlanco.getDenominacionOrigen());
                }
                if (vinoBlanco.getAnoCosecha() != null) {
                    existingVinoBlanco.setAnoCosecha(vinoBlanco.getAnoCosecha());
                }
                if (vinoBlanco.getNombre() != null) {
                    existingVinoBlanco.setNombre(vinoBlanco.getNombre());
                }
                if (vinoBlanco.getMaduracion() != null) {
                    existingVinoBlanco.setMaduracion(vinoBlanco.getMaduracion());
                }
                if (vinoBlanco.getDescripcion() != null) {
                    existingVinoBlanco.setDescripcion(vinoBlanco.getDescripcion());
                }
                if (vinoBlanco.getCata() != null) {
                    existingVinoBlanco.setCata(vinoBlanco.getCata());
                }
                if (vinoBlanco.getPurezaVino() != null) {
                    existingVinoBlanco.setPurezaVino(vinoBlanco.getPurezaVino());
                }
                if (vinoBlanco.getPrecioBruto() != null) {
                    existingVinoBlanco.setPrecioBruto(vinoBlanco.getPrecioBruto());
                }
                if (vinoBlanco.getTipoUvaBlanca() != null) {
                    existingVinoBlanco.setTipoUvaBlanca(vinoBlanco.getTipoUvaBlanca());
                }
                if (vinoBlanco.getStock() != null) {
                    existingVinoBlanco.setStock(vinoBlanco.getStock());
                }

                return existingVinoBlanco;
            })
            .map(vinoBlancoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vinoBlanco.getId().toString())
        );
    }

    /**
     * {@code GET  /vino-blancos} : get all the vinoBlancos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vinoBlancos in body.
     */
    @GetMapping("/vino-blancos")
    public List<VinoBlanco> getAllVinoBlancos() {
        log.debug("REST request to get all VinoBlancos");
        return vinoBlancoRepository.findAll();
    }

    /**
     * {@code GET  /vino-blancos/:id} : get the "id" vinoBlanco.
     *
     * @param id the id of the vinoBlanco to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vinoBlanco, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vino-blancos/{id}")
    public ResponseEntity<VinoBlanco> getVinoBlanco(@PathVariable Long id) {
        log.debug("REST request to get VinoBlanco : {}", id);
        Optional<VinoBlanco> vinoBlanco = vinoBlancoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vinoBlanco);
    }

    /**
     * {@code DELETE  /vino-blancos/:id} : delete the "id" vinoBlanco.
     *
     * @param id the id of the vinoBlanco to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vino-blancos/{id}")
    public ResponseEntity<Void> deleteVinoBlanco(@PathVariable Long id) {
        log.debug("REST request to delete VinoBlanco : {}", id);
        vinoBlancoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
