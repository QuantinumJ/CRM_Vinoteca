package goodsmell.domain;

import static org.assertj.core.api.Assertions.assertThat;

import goodsmell.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VinoRosadoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VinoRosado.class);
        VinoRosado vinoRosado1 = new VinoRosado();
        vinoRosado1.setId(1L);
        VinoRosado vinoRosado2 = new VinoRosado();
        vinoRosado2.setId(vinoRosado1.getId());
        assertThat(vinoRosado1).isEqualTo(vinoRosado2);
        vinoRosado2.setId(2L);
        assertThat(vinoRosado1).isNotEqualTo(vinoRosado2);
        vinoRosado1.setId(null);
        assertThat(vinoRosado1).isNotEqualTo(vinoRosado2);
    }
}
