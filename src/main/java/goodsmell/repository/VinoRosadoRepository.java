package goodsmell.repository;

import goodsmell.domain.VinoRosado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the VinoRosado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VinoRosadoRepository extends JpaRepository<VinoRosado, Long> {}
