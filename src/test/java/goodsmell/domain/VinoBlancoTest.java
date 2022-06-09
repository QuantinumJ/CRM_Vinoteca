package goodsmell.domain;

import static org.assertj.core.api.Assertions.assertThat;

import goodsmell.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VinoBlancoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VinoBlanco.class);
        VinoBlanco vinoBlanco1 = new VinoBlanco();
        vinoBlanco1.setId(1L);
        VinoBlanco vinoBlanco2 = new VinoBlanco();
        vinoBlanco2.setId(vinoBlanco1.getId());
        assertThat(vinoBlanco1).isEqualTo(vinoBlanco2);
        vinoBlanco2.setId(2L);
        assertThat(vinoBlanco1).isNotEqualTo(vinoBlanco2);
        vinoBlanco1.setId(null);
        assertThat(vinoBlanco1).isNotEqualTo(vinoBlanco2);
    }
}
