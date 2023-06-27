<template>
    <header class="site-header container">
        <small class="site-header__prefix">URBN Hackathon</small>
        <h1 class="site-header__heading">
            SEO Transl<span class="ai"><span class="a">a</span><span class="i">i</span></span>tions
        </h1>
    </header>
</template>

<style lang="scss" scoped>
.site-header {
  text-align: center;

    &__prefix {
        color: var(--font-heading-color);
        letter-spacing: 0.5em;
        text-transform: uppercase;
    }

    &__heading {
        font-family: var(--font-heading);
        font-size: var(--font-size-title);
        line-height: 1em;
        margin-top: 0.25em;
        font-size: 3em;
        // force text descenders to show
        padding: 0.25em;
        position: relative;
        text-transform: uppercase;
        text-shadow: 0 3px 5px var(--bg-secondary);
    }

    &__heading .ai {
        letter-spacing: 0;
    }
    &__heading .a {
        color: var(--bg-secondary);
    }
    &__heading .i {
        color: var(--bg-secondary);
    }
}
</style>
