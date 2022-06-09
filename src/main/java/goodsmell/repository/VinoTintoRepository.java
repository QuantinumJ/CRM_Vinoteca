package goodsmell.repository;

import goodsmell.domain.VinoTinto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the VinoTinto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VinoTintoRepository extends JpaRepository<VinoTinto, Long> {}
