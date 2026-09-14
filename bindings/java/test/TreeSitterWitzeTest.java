import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.witze.TreeSitterWitze;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterWitzeTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterWitze.language()));
    }
}
