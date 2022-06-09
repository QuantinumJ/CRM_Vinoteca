package goodsmell.repository;

import goodsmell.domain.VinoBlanco;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the VinoBlanco entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VinoBlancoRepository extends JpaRepository<VinoBlanco, Long> {}
