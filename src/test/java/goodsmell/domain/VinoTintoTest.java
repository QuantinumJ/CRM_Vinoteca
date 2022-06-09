package goodsmell.domain;

import static org.assertj.core.api.Assertions.assertThat;

import goodsmell.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VinoTintoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VinoTinto.class);
        VinoTinto vinoTinto1 = new VinoTinto();
        vinoTinto1.setId(1L);
        VinoTinto vinoTinto2 = new VinoTinto();
        vinoTinto2.setId(vinoTinto1.getId());
        assertThat(vinoTinto1).isEqualTo(vinoTinto2);
        vinoTinto2.setId(2L);
        assertThat(vinoTinto1).isNotEqualTo(vinoTinto2);
        vinoTinto1.setId(null);
        assertThat(vinoTinto1).isNotEqualTo(vinoTinto2);
    }
}
